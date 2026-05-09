'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Send, Phone, Mail, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { services } from '@/data/services';
import { contactInfo } from '@/data/business';
import { savePendingSubmission, clearPendingSubmission, getPendingSubmission } from '@/lib/storage';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'persisted'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  // Check for recovered data on mount
  useEffect(() => {
    const pending = getPendingSubmission();
    if (pending) {
      form.reset(pending.data);
      setStatus('persisted');
    }
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        clearPendingSubmission();
        form.reset();
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      savePendingSubmission(values);
      setStatus('error');
      const message = error instanceof Error ? error.message : 'Network error. Your progress has been saved locally and will be retried when possible.';
      setErrorMessage(message);
    }
  }

  return (
    <section id="contact" className="py-32 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Info Side */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-8">
              Let&apos;s Start Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pool-400 to-sky-300 text-nowrap">Transformation</span>
            </h2>
            <p className="text-pool-100/60 text-lg mb-12 max-w-md">
              Whether it&apos;s a weekly maintenance plan or a complete pool redesign, Derek is ready to elevate your backyard luxury.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-pool-500/10 flex items-center justify-center border border-pool-500/20 group-hover:bg-pool-500/20 transition-colors">
                  <Phone className="w-6 h-6 text-pool-400" />
                </div>
                <div>
                  <p className="text-pool-100/40 text-xs uppercase tracking-widest mb-1">Direct Line</p>
                  <p className="text-white text-xl font-bold">{contactInfo.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-pool-500/10 flex items-center justify-center border border-pool-500/20 group-hover:bg-pool-500/20 transition-colors">
                  <Mail className="w-6 h-6 text-pool-400" />
                </div>
                <div>
                  <p className="text-pool-100/40 text-xs uppercase tracking-widest mb-1">Email</p>
                  <p className="text-white text-xl font-bold">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-pool-500/10 flex items-center justify-center border border-pool-500/20 group-hover:bg-pool-500/20 transition-colors">
                  <MapPin className="w-6 h-6 text-pool-400" />
                </div>
                <div>
                  <p className="text-pool-100/40 text-xs uppercase tracking-widest mb-1">Based In</p>
                  <p className="text-white text-xl font-bold">Holbrook, Long Island</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="glass-dark border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-pool-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-pool-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Request Received</h3>
                    <p className="text-pool-100/60 mb-8 max-w-sm mx-auto">
                      Thank you for choosing Derek&apos;s Complete Pool Care. We will contact you shortly to discuss your transformation.
                    </p>
                    <Button variant="outline" onClick={() => setStatus('idle')} className="rounded-full border-pool-500/30 text-pool-100">
                      Send Another Request
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {status === 'persisted' && (
                          <div className="p-4 bg-pool-500/10 border border-pool-500/20 rounded-xl flex items-center gap-3 mb-6">
                            <CheckCircle2 className="w-5 h-5 text-pool-400" />
                            <span className="text-sm text-pool-100">We recovered your previous unsent draft.</span>
                          </div>
                        )}
                        
                        {status === 'error' && (
                          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 mb-6">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span className="text-sm text-red-100">{errorMessage}</span>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-pool-100/50">Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" className="glass-input h-12" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-pool-100/50">Email Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="john@example.com" className="glass-input h-12" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-pool-100/50">Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="(631) 000-0000" className="glass-input h-12" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-pool-100/50">Service Requested</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="glass-input h-12 text-pool-100/50">
                                      <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    {services.map(s => (
                                      <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-pool-100/50">Your Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about your pool project..." 
                                  className="glass-input min-h-[120px] resize-none" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          disabled={status === 'loading'}
                          className="w-full bg-pool-500 hover:bg-pool-400 text-white h-14 rounded-full text-lg font-bold shadow-lg shadow-pool-500/20 transition-all active:scale-[0.98]"
                        >
                          {status === 'loading' ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                          ) : (
                            <span className="flex items-center gap-2">Send Request <Send className="w-5 h-5" /></span>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
