import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plane,
  MapPin,
  Luggage,
  Hotel,
  Utensils,
  Navigation,
  ShieldAlert,
  Ticket,
  Users,
  GraduationCap,
  Sparkles,
  Clock,
  Monitor,
  Wallet,
  Check,
  ArrowRight,
} from "lucide-react";

const Section = ({ id, eyebrow, title, children }) => (
  <section id={id} className="relative scroll-mt-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="max-w-3xl">
        {eyebrow && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/80">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{eyebrow}</span>
          </div>
        )}
        {title && (
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            {title}
          </h2>
        )}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  </section>
);

const GlassCard = ({ children, className = "" }) => (
  <div
    className={
      "rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl " +
      className
    }
  >
    {children}
  </div>
);

const Chip = ({ icon: Icon, label }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-white/85">
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </div>
);

const ProgramItem = ({ icon: Icon, title, desc, hint, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, delay: idx * 0.03 }}
    className="group"
  >
    <GlassCard className="h-full p-5 sm:p-6 hover:bg-white/[0.06] transition-colors">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="h-11 w-11 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-white/90" />
          </div>
          <div className="pointer-events-none absolute -inset-2 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity blur-xl bg-gradient-to-r from-teal-400/20 via-amber-300/10 to-orange-400/20" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
            {title}
          </h3>
          <p className="mt-1 text-sm sm:text-[15px] leading-relaxed text-white/70">
            {desc}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-teal-200/90">
            <span className="text-white/40">👉</span>
            <span className="leading-snug">{hint}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

const Stat = ({ value, label }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
    <div className="text-2xl font-semibold text-white">{value}</div>
    <div className="mt-1 text-sm text-white/70">{label}</div>
  </div>
);

const AnchorButton = ({ href, children, variant = "primary" }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm sm:text-base font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-teal-400 to-amber-300 text-black shadow-[0_18px_55px_rgba(45,212,191,0.25)] hover:brightness-110"
      : "border border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.06]";

  return (
    <a href={href} className={base + " " + styles}>
      {children}
    </a>
  );
};

function formatMSKToChicago(mskTime) {
  try {
    const now = new Date();
    const yyyy = now.getUTCFullYear();
    const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(now.getUTCDate()).padStart(2, "0");

    const [hh, min] = mskTime.split(":");

    // МСК = UTC+3 → получаем UTC-время
    const utc = new Date(`${yyyy}-${mm}-${dd}T${hh}:${min}:00Z`);
    utc.setUTCHours(utc.getUTCHours() - 3);

    const parts = new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Chicago",
      hour12: false,
    }).formatToParts(utc);

    const H = parts.find((p) => p.type === "hour")?.value ?? hh;
    const M = parts.find((p) => p.type === "minute")?.value ?? min;
    return `${H}:${M}`;
  } catch {
    return mskTime;
  }
}

export default function TravelEnglishLanding() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      setIsAtBottom(scrolled > docHeight - 140);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const schedule = useMemo(() => {
    const thu = { day: "Четверг", timeMSK: "15:00", group: "4–5 класс" };
    const fri = { day: "Пятница", timeMSK: "15:30", group: "6–8 класс" };
    return [
      { ...thu, timeChicago: formatMSKToChicago(thu.timeMSK) },
      { ...fri, timeChicago: formatMSKToChicago(fri.timeMSK) },
    ];
  }, []);

  const program = useMemo(
    () => [
      {
        icon: Plane,
        title: "1. Аэропорт без стресса",
        desc: "Регистрация, паспортный контроль, вопросы на таможне — всё на английском.",
        hint: "Уверенность уже в первые часы за границей.",
      },
      {
        icon: Hotel,
        title: "2. В отеле: заселение и помощь",
        desc: "Как попросить сменить номер, вызвать уборку или спросить про Wi-Fi.",
        hint: "Практика вежливых фраз и повседневной лексики.",
      },
      {
        icon: Utensils,
        title: "3. Кафе и рестораны",
        desc: "Заказ еды, вопросы про аллергены, счёт и чаевые.",
        hint: "Развитие гастрономического словаря и уверенности в общении.",
      },
      {
        icon: Navigation,
        title: "4. На улице: ориентирование и просьбы",
        desc: "Как спросить дорогу, вызвать такси или найти аптеку.",
        hint: "Понимание устной речи и произношения в реальных ситуациях.",
      },
      {
        icon: ShieldAlert,
        title: "5. Экстренные случаи",
        desc: "Потеря вещей, болезнь, помощь полиции — всё это на английском.",
        hint: "Важные фразы, которые могут спасти отпуск.",
      },
      {
        icon: Ticket,
        title: "6–8. Туризм и развлечения",
        desc: "Покупка билетов, экскурсии, общение с гидами, музеи и парки.",
        hint: "Погружение в культурный контекст через язык.",
      },
      {
        icon: Users,
        title: "9. Дружба в путешествиях",
        desc: "Как познакомиться с другими детьми или подростками за границей.",
        hint: "Игровая практика диалогов и неформального общения.",
      },
      {
        icon: GraduationCap,
        title: "10. Дипломный проект: «Мой идеальный отпуск»",
        desc: "Ребёнок планирует воображаемое путешествие и представляет его на английском.",
        hint: "Развитие связной речи и творческого самовыражения.",
      },
    ],
    []
  );

  const onEnroll = (e) => {
    e?.preventDefault?.();
    document.getElementById("enroll")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_15%_10%,rgba(45,212,191,0.18),transparent_60%),radial-gradient(900px_600px_at_70%_20%,rgba(251,191,36,0.14),transparent_55%),radial-gradient(1200px_700px_at_60%_85%,rgba(249,115,22,0.12),transparent_55%)]" />
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:100%_28px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/45 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <a href="#top" className="group inline-flex items-center gap-3 rounded-2xl px-2 py-1">
              <div className="relative">
                <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                  <Plane className="h-5 w-5" />
                </div>
                <div className="absolute -inset-2 rounded-[18px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-teal-400/20 via-amber-300/10 to-orange-400/20" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">Английский для путешествий</div>
                <div className="text-xs text-white/60">курс для детей • A2–B1</div>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-1 text-sm text-white/75">
              <a className="rounded-xl px-3 py-2 hover:bg-white/[0.06] hover:text-white transition" href="#audience">
                Для кого
              </a>
              <a className="rounded-xl px-3 py-2 hover:bg-white/[0.06] hover:text-white transition" href="#program">
                Программа
              </a>
              <a className="rounded-xl px-3 py-2 hover:bg-white/[0.06] hover:text-white transition" href="#why">
                Почему
              </a>
              <a className="rounded-xl px-3 py-2 hover:bg-white/[0.06] hover:text-white transition" href="#needs">
                Требуется
              </a>
              <a className="rounded-xl px-3 py-2 hover:bg-white/[0.06] hover:text-white transition" href="#schedule">
                Расписание
              </a>
              <a className="rounded-xl px-3 py-2 hover:bg-white/[0.06] hover:text-white transition" href="#price">
                Стоимость
              </a>
            </nav>

            <button
              onClick={onEnroll}
              className="hidden sm:inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.06] transition"
            >
              Записаться <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main id="top" className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-10 sm:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="inline-flex flex-wrap items-center gap-2">
                  <Chip icon={MapPin} label="Реальные ситуации" />
                  <Chip icon={Luggage} label="От кофе до багажа" />
                  <Chip icon={Sparkles} label="Интерактивно" />
                </div>

                <h1 className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                  Курс «Английский для путешествий»
                </h1>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/75">
                  Мечтаете свободно общаться за границей — от заказа кофе до поиска утраченного чемодана?
                  Этот курс научит вашего ребёнка реальному разговорному английскому, который пригодится
                  в отпуске, поездках и будущих путешествиях!
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onEnroll}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm sm:text-base font-semibold text-black bg-gradient-to-r from-teal-400 to-amber-300 shadow-[0_18px_55px_rgba(45,212,191,0.25)] hover:brightness-110 transition"
                  >
                    Записаться на курс <ArrowRight className="h-4 w-4" />
                  </button>
                  <AnchorButton href="#program" variant="secondary">
                    Смотреть программу <ArrowRight className="h-4 w-4" />
                  </AnchorButton>
                </div>

                <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Stat value="10" label="уроков в курсе" />
                  <Stat value="≤ 6" label="детей в группе" />
                  <Stat value="A2–B1" label="итоговый уровень" />
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <GlassCard className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm text-white/60">Набор открыт</div>
                    <div className="mt-1 text-xl font-semibold tracking-tight">Места ограничены</div>
                  </div>
                  <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    "Акцент на практическую, живую речь",
                    "Ситуации из реальной жизни путешественника",
                    "Ролевые игры, аудиоситуации, мини-квесты",
                    "Комфортный темп и поддержка преподавателя",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                    >
                      <div className="mt-0.5 h-6 w-6 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                        <Check className="h-4 w-4" />
                      </div>
                      <div className="text-sm sm:text-[15px] leading-relaxed text-white/75">{t}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-teal-400/10 via-amber-300/10 to-orange-400/10 p-4">
                  <div className="text-sm text-white/70">
                    👉 Запишитесь сейчас — и следующее путешествие станет первым, где ваш ребёнок заговорит по-английски
                    без страха!
                  </div>
                </div>
              </GlassCard>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <GlassCard className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Удобное расписание</div>
                      <div className="text-xs text-white/60">Чт/Пт • онлайн</div>
                    </div>
                  </div>
                </GlassCard>
                <GlassCard className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                      <Monitor className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Zoom + наушники</div>
                      <div className="text-xs text-white/60">всё просто</div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Audience */}
        <Section id="audience" eyebrow="📌 Для кого курс" title="Две группы — под возраст и темп">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold">Первая группа</div>
                  <div className="mt-1 text-white/70">4–5 класс</div>
                  <div className="mt-4 text-sm text-white/70 leading-relaxed">
                    Мягкое погружение в разговорные ситуации: много повторений, понятные шаблоны, игры и мини-диалоги.
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold">Вторая группа</div>
                  <div className="mt-1 text-white/70">6–8 класс</div>
                  <div className="mt-4 text-sm text-white/70 leading-relaxed">
                    Больше свободной речи и вариативности: ролевые игры, ситуации «как в жизни», развитие уверенности и
                    реакции на слух.
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </Section>

        {/* Program */}
        <Section id="program" eyebrow="📚 Программа курса" title="10 тем — как маршрут путешествия">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {program.map((p, idx) => (
              <ProgramItem key={p.title} {...p} idx={idx} />
            ))}
          </div>
        </Section>

        {/* Why */}
        <Section id="why" eyebrow="✨ Почему этот курс особенный?" title="Понятно, живо, по-настоящему полезно">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7">
              <GlassCard className="p-6 sm:p-7">
                <div className="space-y-3">
                  {[
                    "Акцент на практическую, живую речь, а не на грамматику ради грамматики.",
                    "Все ситуации — из реальной жизни путешественника.",
                    "Интерактивные задания: ролевые игры, аудиоситуации, мини-квесты.",
                    "Ребёнок выходит на уровень A2–B1 (Pre-Intermediate) за курс.",
                  ].map((t) => (
                    <div key={t} className="flex gap-3">
                      <div className="mt-0.5 h-6 w-6 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                        <Check className="h-4 w-4" />
                      </div>
                      <div className="text-sm sm:text-[15px] leading-relaxed text-white/75">{t}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            <div className="lg:col-span-5">
              <GlassCard className="p-6 sm:p-7">
                <div className="text-lg font-semibold">📢 Набор открыт!</div>
                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-white/75">
                  Группы маленькие — максимум 6 детей, чтобы каждый получил внимание. Места ограничены!
                </p>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-sm text-white/80">
                    👉 Запишитесь сейчас — и следующее путешествие станет первым, где ваш ребёнок заговорит по-английски
                    без страха!
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onEnroll}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm sm:text-base font-semibold text-black bg-gradient-to-r from-teal-400 to-amber-300 shadow-[0_18px_55px_rgba(45,212,191,0.25)] hover:brightness-110 transition"
                  >
                    Записаться <ArrowRight className="h-4 w-4" />
                  </button>
                  <AnchorButton href="#price" variant="secondary">
                    Посмотреть стоимость <ArrowRight className="h-4 w-4" />
                  </AnchorButton>
                </div>
              </GlassCard>
            </div>
          </div>
        </Section>

        {/* Needs */}
        <Section id="needs" eyebrow="💻 Что потребуется" title="Никакой сложности — только Zoom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                  <Monitor className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold">Техника</div>
                  <div className="mt-2 text-sm text-white/75 leading-relaxed">
                    • Стационарный компьютер или ноутбук с наушниками и микрофоном
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                  <Navigation className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold">Связь</div>
                  <div className="mt-2 text-sm text-white/75 leading-relaxed">• Стабильный интернет и Zoom</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </Section>

        {/* Schedule */}
        <Section id="schedule" eyebrow="🕒 Расписание" title="Фиксированные дни — легко планировать">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7">
              <GlassCard className="p-6 sm:p-7">
                <div className="space-y-3">
                  {schedule.map((s) => (
                    <div
                      key={s.day}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">{s.day}</div>
                          <div className="text-sm text-white/70">{s.group}</div>
                        </div>
                      </div>
                      <div className="text-sm sm:text-base">
                        <span className="text-white/70">{s.timeMSK} (МСК)</span>
                        <span className="text-white/35"> • </span>
                        <span className="text-white/90">{s.timeChicago} (Chicago)</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 text-xs text-white/50 leading-relaxed">
                  Примечание: время Chicago рассчитано автоматически по текущей дате (может отличаться при смене сезонного
                  времени).
                </div>
              </GlassCard>
            </div>

            <div className="lg:col-span-5">
              <GlassCard className="p-6 sm:p-7">
                <div className="text-lg font-semibold">Формат</div>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Онлайн-занятия в Zoom. Маленькие группы — максимум 6 детей, чтобы каждый получил внимание и практику
                  речи.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Chip icon={Users} label="до 6 учеников" />
                  <Chip icon={Sparkles} label="интерактив" />
                  <Chip icon={Plane} label="travel English" />
                </div>
              </GlassCard>
            </div>
          </div>
        </Section>

        {/* Price */}
        <Section id="price" eyebrow="💳 Стоимость" title="Прозрачно и понятно">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassCard className="p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                  <Wallet className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-lg font-semibold">Полный курс</div>
                  <div className="mt-1 text-white/70">10 уроков</div>
                  <div className="mt-4 text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-amber-200 to-orange-300">
                    12 000 руб
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                  <Wallet className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-lg font-semibold">Абонемент</div>
                  <div className="mt-1 text-white/70">оплата за урок</div>
                  <div className="mt-4 text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-amber-200 to-orange-300">
                    1 300 руб / урок
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </Section>

        {/* Enroll */}
        <Section id="enroll" eyebrow="✈️ Финальный шаг" title="Готовы отправиться в языковое путешествие?">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            <div className="lg:col-span-7">
              <GlassCard className="p-6 sm:p-7 h-full">
                <div className="text-sm text-white/60">📌 Для записи</div>
                <div className="mt-2 text-lg font-semibold">Оставьте заявку</div>
                <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-white/75">
                  Эта форма — демонстрационная. Позже можно подключить WhatsApp/Telegram или Google Form.
                </p>

                <form
                  className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Заявка отправлена (демо). Замените обработчик на реальную отправку :)");
                  }}
                >
                  <label className="block">
                    <span className="text-xs text-white/60">Имя родителя</span>
                    <input
                      required
                      className="mt-1 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-teal-300/50"
                      placeholder="Например, Анна"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-white/60">Контакт (телефон/мессенджер)</span>
                    <input
                      required
                      className="mt-1 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-teal-300/50"
                      placeholder="+7 … / @username"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs text-white/60">Комментарий</span>
                    <input
                      className="mt-1 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-teal-300/50"
                      placeholder="Класс ребёнка, вопросы, пожелания…"
                    />
                  </label>

                  <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm sm:text-base font-semibold text-black bg-gradient-to-r from-teal-400 to-amber-300 shadow-[0_18px_55px_rgba(45,212,191,0.25)] hover:brightness-110 transition"
                    >
                      Отправить заявку <ArrowRight className="h-4 w-4" />
                    </button>
                    <a
                      href="#bottom"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-3 text-sm sm:text-base font-semibold text-white hover:bg-white/[0.06] transition"
                    >
                      Вниз к кнопке <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </form>
              </GlassCard>
            </div>

            <div className="lg:col-span-5">
              <GlassCard className="p-6 sm:p-7 h-full">
                <div className="text-lg font-semibold">Что будет после заявки</div>
                <div className="mt-4 space-y-3">
                  {[
                    "Уточним уровень и класс ребёнка",
                    "Подберём группу (4–5 или 6–8)",
                    "Ответим на вопросы и пришлём ссылку на Zoom",
                    "Закрепим место и стартуем по расписанию",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                    >
                      <div className="mt-0.5 h-6 w-6 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                        <Check className="h-4 w-4" />
                      </div>
                      <div className="text-sm text-white/75 leading-relaxed">{t}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </Section>

        {/* Bottom CTA */}
        <div id="bottom" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-teal-400/12 via-amber-300/10 to-orange-400/12 p-5 sm:p-7 shadow-[0_25px_90px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-semibold tracking-tight">Пора на взлёт ✈️</div>
                <div className="mt-1 text-sm sm:text-[15px] text-white/70">
                  Нажмите кнопку — и мы забронируем место в группе.
                </div>
              </div>

              <a
                href="#enroll"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-3xl px-7 py-4 text-base sm:text-lg font-extrabold text-black bg-gradient-to-r from-teal-400 via-amber-300 to-orange-300 shadow-[0_22px_70px_rgba(251,191,36,0.22)] hover:brightness-110 transition"
              >
                Записаться на курс <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <footer className="mt-8 text-center text-xs text-white/45">
            © {new Date().getFullYear()} • Английский для путешествий • Онлайн-курс
          </footer>
        </div>

        {/* Floating CTA (mobile) */}
        <div
          className={
            "fixed inset-x-0 bottom-0 z-50 p-3 sm:hidden transition-transform " +
            (isAtBottom ? "translate-y-full" : "translate-y-0")
          }
        >
          <div className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-2 shadow-[0_18px_70px_rgba(0,0,0,0.65)]">
            <button
              onClick={onEnroll}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-base font-extrabold text-black bg-gradient-to-r from-teal-400 via-amber-300 to-orange-300 hover:brightness-110 transition"
            >
              Записаться на курс <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}