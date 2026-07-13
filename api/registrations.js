import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { full_name, whatsapp, class_level, major, gender, divisions, reason } =
        req.body || {};

      if (!full_name || !whatsapp || !class_level || !major || !gender || !reason) {
        return res.status(400).json({ error: 'Data tidak lengkap' });
      }

      if (!Array.isArray(divisions) || divisions.length === 0) {
        return res.status(400).json({ error: 'Pilih minimal satu divisi' });
      }

      const { data, error } = await supabase
        .from('registrations')
        .insert({
          full_name: String(full_name).trim(),
          whatsapp: String(whatsapp).trim(),
          class_level: String(class_level),
          major: String(major),
          gender: String(gender),
          divisions,
          reason: String(reason).trim(),
        })
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
