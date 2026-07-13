import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { m, AnimatePresence } from '../lib/motion';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { formDivisions, jurusanOptions } from '../data/divisions';
import { createRegistration, isFirebaseConfigured } from '../lib/firebase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { SectionHeading } from './ui/section-heading';

const schema = z.object({
  full_name: z
    .string()
    .min(3, 'Nama minimal 3 karakter')
    .max(100, 'Nama terlalu panjang'),
  whatsapp: z
    .string()
    .min(10, 'Nomor WhatsApp minimal 10 digit')
    .max(15, 'Nomor WhatsApp terlalu panjang')
    .regex(/^[0-9+\s-]+$/, 'Nomor WhatsApp tidak valid'),
  class_level: z.enum(['X', 'XI', 'XII'], {
    message: 'Pilih kelas',
  }),
  major: z.string().min(1, 'Pilih jurusan'),
  gender: z.enum(['Laki-laki', 'Perempuan'], {
    message: 'Pilih jenis kelamin',
  }),
  divisions: z.array(z.string()).min(1, 'Pilih minimal satu divisi'),
  reason: z
    .string()
    .min(20, 'Alasan minimal 20 karakter')
    .max(1000, 'Alasan terlalu panjang'),
  agreement: z.literal(true, {
    message: 'Kamu harus menyetujui pernyataan ini',
  }),
});

type FormValues = z.infer<typeof schema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <m.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-xs text-neutral-400"
    >
      {message}
    </m.p>
  );
}

export default function RegistrationForm() {
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: '',
      whatsapp: '',
      class_level: undefined,
      major: '',
      gender: undefined,
      divisions: [],
      reason: '',
      agreement: undefined as unknown as true,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitState('loading');
    setErrorMsg('');
    try {
      const payload = {
        full_name: data.full_name,
        whatsapp: data.whatsapp,
        class_level: data.class_level,
        major: data.major,
        gender: data.gender,
        divisions: data.divisions,
        reason: data.reason,
      };

      if (!isFirebaseConfigured()) {
        throw new Error(
          'Firebase belum dikonfigurasi. Tambahkan VITE_FIREBASE_* di environment variables.'
        );
      }

      await createRegistration(payload);

      setSubmitState('success');
      reset();
    } catch (err) {
      setSubmitState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Terjadi kesalahan');
    }
  };

  return (
    <section id="daftar" className="py-20 md:py-28 bg-neutral-950/60">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Form Pendaftaran"
              title="Gabung bersama JCC Skensa"
              description="Isi data dengan benar. Tim panitia akan menghubungi kamu melalui WhatsApp."
              className="mb-0 sticky top-28"
            />
          </div>

          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-8"
          >
            <Card className="rounded-[20px] md:rounded-[28px] border-neutral-800 shadow-sm shadow-white/5 overflow-hidden">
              <CardHeader className="border-b border-neutral-900 bg-black/80 backdrop-blur px-6 md:px-8 py-6">
                <CardTitle className="text-lg md:text-xl font-semibold tracking-tight text-white">
                  Form Pendaftaran Open Recruitment 2026
                </CardTitle>
                <p className="text-sm text-neutral-500 mt-1">
                  Field bertanda * wajib diisi
                </p>
              </CardHeader>

              <CardContent className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {submitState === 'success' ? (
                    <m.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-16 flex flex-col items-center text-center"
                    >
                      <div className="h-16 w-16 rounded-full border border-neutral-800 bg-neutral-950 flex items-center justify-center mb-5">
                        <CheckCircle2 className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold tracking-tight text-white">
                        Pendaftaran terkirim
                      </h3>
                      <p className="mt-3 text-neutral-400 max-w-sm leading-relaxed">
                        Terima kasih! Data kamu sudah kami terima. Pantau WhatsApp untuk info
                        selanjutnya.
                      </p>
                      <Button
                        className="mt-8 rounded-full"
                        variant="outline"
                        onClick={() => setSubmitState('idle')}
                      >
                        Daftar lagi
                      </Button>
                    </m.div>
                  ) : (
                    <m.form
                      key="form"
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-7"
                      noValidate
                    >
                      <div className="space-y-2">
                        <Label htmlFor="full_name">
                          Nama Lengkap <span className="text-neutral-500">*</span>
                        </Label>
                        <Input
                          id="full_name"
                          placeholder="Masukkan nama lengkap"
                          {...register('full_name')}
                          aria-invalid={!!errors.full_name}
                        />
                        <FieldError message={errors.full_name?.message} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="whatsapp">
                          Nomor WhatsApp <span className="text-neutral-500">*</span>
                        </Label>
                        <Input
                          id="whatsapp"
                          placeholder="08xxxxxxxxxx"
                          inputMode="tel"
                          {...register('whatsapp')}
                          aria-invalid={!!errors.whatsapp}
                        />
                        <FieldError message={errors.whatsapp?.message} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label>
                            Kelas <span className="text-neutral-500">*</span>
                          </Label>
                          <Controller
                            name="class_level"
                            control={control}
                            render={({ field }) => (
                              <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex flex-col gap-2.5"
                              >
                                {(['X', 'XI', 'XII'] as const).map((lvl) => (
                                  <label
                                    key={lvl}
                                    className="flex items-center gap-3 cursor-pointer group"
                                  >
                                    <RadioGroupItem value={lvl} id={`class-${lvl}`} />
                                    <span className="text-sm text-neutral-300 group-hover:text-white">
                                      {lvl}
                                    </span>
                                  </label>
                                ))}
                              </RadioGroup>
                            )}
                          />
                          <FieldError message={errors.class_level?.message} />
                        </div>

                        <div className="space-y-2">
                          <Label>
                            Jurusan <span className="text-neutral-500">*</span>
                          </Label>
                          <Controller
                            name="major"
                            control={control}
                            render={({ field }) => (
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger aria-invalid={!!errors.major}>
                                  <SelectValue placeholder="Pilih jurusan" />
                                </SelectTrigger>
                                <SelectContent>
                                  {jurusanOptions.map((j) => (
                                    <SelectItem key={j} value={j}>
                                      {j}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <FieldError message={errors.major?.message} />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>
                          Jenis Kelamin <span className="text-neutral-500">*</span>
                        </Label>
                        <Controller
                          name="gender"
                          control={control}
                          render={({ field }) => (
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="flex flex-col sm:flex-row gap-3 sm:gap-6"
                            >
                              {(['Laki-laki', 'Perempuan'] as const).map((g) => (
                                <label
                                  key={g}
                                  className="flex items-center gap-3 cursor-pointer group"
                                >
                                  <RadioGroupItem value={g} id={`gender-${g}`} />
                                  <span className="text-sm text-neutral-300 group-hover:text-white">
                                    {g}
                                  </span>
                                </label>
                              ))}
                            </RadioGroup>
                          )}
                        />
                        <FieldError message={errors.gender?.message} />
                      </div>

                      <div className="space-y-3">
                        <Label>
                          Ingin Bergabung Pada Divisi?{' '}
                          <span className="text-neutral-500">*</span>
                        </Label>
                        <Controller
                          name="divisions"
                          control={control}
                          render={({ field }) => (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {formDivisions.map((d) => {
                                const checked = field.value?.includes(d.id);
                                return (
                                  <label
                                    key={d.id}
                                    className="flex items-center gap-3 rounded-2xl border border-neutral-800 px-4 py-3 cursor-pointer transition-all hover:border-neutral-500 has-[[data-state=checked]]:border-white has-[[data-state=checked]]:bg-neutral-950"
                                  >
                                    <Checkbox
                                      checked={checked}
                                      onCheckedChange={(val) => {
                                        const next = val
                                          ? [...(field.value || []), d.id]
                                          : (field.value || []).filter((v) => v !== d.id);
                                        field.onChange(next);
                                      }}
                                    />
                                    <span className="text-sm text-neutral-300">{d.label}</span>
                                  </label>
                                );
                              })}
                            </div>
                          )}
                        />
                        <FieldError message={errors.divisions?.message} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reason">
                          Alasan Bergabung <span className="text-neutral-500">*</span>
                        </Label>
                        <Textarea
                          id="reason"
                          placeholder="Ceritakan alasanmu ingin bergabung dengan JCC Skensa..."
                          {...register('reason')}
                          aria-invalid={!!errors.reason}
                        />
                        <FieldError message={errors.reason?.message} />
                      </div>

                      <div className="space-y-2">
                        <Controller
                          name="agreement"
                          control={control}
                          render={({ field }) => (
                            <label className="flex items-start gap-3 cursor-pointer">
                              <Checkbox
                                checked={field.value === true}
                                onCheckedChange={(val) => field.onChange(val === true)}
                                className="mt-0.5"
                              />
                              <span className="text-sm text-neutral-400 leading-relaxed">
                                Saya menyatakan bahwa data yang saya isi benar.
                              </span>
                            </label>
                          )}
                        />
                        <FieldError message={errors.agreement?.message} />
                      </div>

                      {submitState === 'error' && (
                        <div className="rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-300">
                          {errorMsg || 'Gagal mengirim. Coba lagi beberapa saat.'}
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={submitState === 'loading'}
                        className="w-full h-12 rounded-2xl text-base"
                      >
                        {submitState === 'loading' ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            Daftar Sekarang
                            <ArrowUpRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </m.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </m.div>
        </div>
      </div>
    </section>
  );
}
