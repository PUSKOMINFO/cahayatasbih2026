import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Alamat",
      content: "Jl. Raya Pondok Pesantren, Demak, Jawa Tengah, Indonesia",
    },
    {
      icon: Phone,
      title: "Telepon",
      content: "+62 812-3456-7890",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@cahayatasbih.or.id",
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      content: "Senin - Sabtu, 08:00 - 16:00 WIB",
    },
  ];

  return (
    <section id="kontak" className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-islamic opacity-20" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Hubungi Kami</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mari <span className="text-gradient">Bersilaturahmi</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Kami siap membantu menjawab pertanyaan Anda tentang pendaftaran, 
            program pendidikan, dan informasi lainnya.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Informasi Kontak</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                    <p className="text-muted-foreground">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h4 className="font-bold text-foreground mb-2">Chat WhatsApp</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Hubungi kami langsung melalui WhatsApp untuk respon cepat.
              </p>
              <Button className="w-full gradient-primary text-white hover:opacity-90">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat via WhatsApp
              </Button>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 aspect-video rounded-2xl overflow-hidden bg-muted border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.6301893869!2d110.6035099!3d-6.8914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70dc25a66e8bf7%3A0x5027a76e3552810!2sDemak%2C%20Demak%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1704067200000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi PPTQ Cahaya Tasbih"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground mb-2">Kirim Pesan</h3>
            <p className="text-muted-foreground mb-8">
              Isi formulir di bawah ini dan kami akan segera menghubungi Anda.
            </p>

            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nama Lengkap
                  </label>
                  <Input
                    placeholder="Masukkan nama lengkap"
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    No. WhatsApp
                  </label>
                  <Input
                    placeholder="08xxxxxxxxxx"
                    className="h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subjek
                </label>
                <Input
                  placeholder="Perihal pesan Anda"
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Pesan
                </label>
                <Textarea
                  placeholder="Tulis pesan Anda di sini..."
                  className="min-h-32 resize-none"
                />
              </div>

              <Button variant="hero" size="lg" className="w-full">
                <Send className="w-5 h-5 mr-2" />
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
