/* =========================================================
   GRAD-002 — السجل الأكاديمي
   غيّر بيانات الزبون من هذا الجزء فقط
========================================================= */

const GRADUATION = {

  /* =========================
     بيانات الخريج
  ========================= */

  graduateName:
    "أحمد محمد",

  degree:
    "بكالوريوس طب وجراحة عامة",

  faculty:
    "كلية الطب",

  department:
    "الطب العام",

  university:
    "جامعة الموصل",

  classYear:
    "دفعة ٢٠٢٧",

  honors:
    "",


  /* =========================
     السجل
  ========================= */

  recordId:
    "TR-2027-001",

  academicYears: [

    {
      title: "السنة الأولى",
      subtitle:
        "المرحلة الأكاديمية الأولى"
    },

    {
      title: "السنة الثانية",
      subtitle:
        "المرحلة الأكاديمية الثانية"
    },

    {
      title: "السنة الثالثة",
      subtitle:
        "المرحلة الأكاديمية الثالثة"
    },

    {
      title: "السنة الرابعة",
      subtitle:
        "المرحلة الأكاديمية النهائية"
    }

  ],


  /* =========================
     الجهة الداعية
  ========================= */

  hostType:
    "family",

  hostName:
    "عائلة أحمد محمد",

  invitationText:
    "يسرنا دعوتكم لمشاركتنا فرحة التخرج والاحتفال بختام هذه الرحلة الأكاديمية.",


  /* =========================
     التاريخ والوقت
  ========================= */

  startAt:
    "2027-07-15T18:00:00+03:00",

  endAt:
    "2027-07-15T21:00:00+03:00",

  timeZone:
    "Asia/Baghdad",


  /* =========================
     المكان
  ========================= */

  venue:
    "القاعة الكبرى للاحتفالات",

  address:
    "الموصل، نينوى",

  city:
    "الموصل",

  country:
    "العراق",


  /* =========================
     الروابط
  ========================= */

  mapsUrl:
    "",

  universityUrl:
    "",

  shareUrl:
    ""

};


/* =========================================================
   ELEMENTS
========================================================= */

const academicYearsContainer =
  document.getElementById(
    "academicYears"
  );

const yearsProgress =
  document.getElementById(
    "yearsProgress"
  );

const verifyButton =
  document.getElementById(
    "verifyButton"
  );

const verificationMessage =
  document.getElementById(
    "verificationMessage"
  );

const statusDot =
  document.getElementById(
    "statusDot"
  );

const documentState =
  document.getElementById(
    "documentState"
  );

const finalStatusText =
  document.getElementById(
    "finalStatusText"
  );

const finalStatusSub =
  document.getElementById(
    "finalStatusSub"
  );

const stampArea =
  document.getElementById(
    "stampArea"
  );

const stampPlaceholder =
  document.getElementById(
    "stampPlaceholder"
  );

const stampCanvas =
  document.getElementById(
    "stampCanvas"
  );

const celebration =
  document.getElementById(
    "celebration"
  );

const mapsButton =
  document.getElementById(
    "mapsButton"
  );

const calendarButton =
  document.getElementById(
    "calendarButton"
  );

const shareButton =
  document.getElementById(
    "shareButton"
  );

const shareFeedback =
  document.getElementById(
    "shareFeedback"
  );

const departmentField =
  document.getElementById(
    "departmentField"
  );

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   STATE
========================================================= */

let verificationRunning =
  false;

let verificationFinished =
  false;


/* =========================================================
   START
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initialize
);


async function initialize() {

  applyDynamicData();

  createAcademicYears();

  setupDate();

  setupMaps();

  setupCalendar();

  setupShare();

  setupVerification();

  await waitForFonts();

  setupStampCanvas();

  if (reducedMotion) {
    completeImmediately();
  }
}


/* =========================================================
   DATA
========================================================= */

function applyDynamicData() {

  const fields = {

    graduateName:
      GRADUATION.graduateName,

    degree:
      GRADUATION.degree,

    faculty:
      GRADUATION.faculty,

    department:
      GRADUATION.department,

    university:
      GRADUATION.university,

    classYear:
      GRADUATION.classYear,

    recordId:
      GRADUATION.recordId,

    venue:
      GRADUATION.venue,

    invitationText:
      GRADUATION.invitationText

  };


  Object.entries(fields)
    .forEach(
      ([name, value]) => {

        document
          .querySelectorAll(
            `[data-field="${name}"]`
          )
          .forEach(
            (element) => {

              element.textContent =
                value || "—";

            }
          );

      }
    );


  if (
    !GRADUATION.department ||
    !GRADUATION.department.trim()
  ) {

    departmentField.hidden =
      true;
  }


  document.title =
    `${GRADUATION.graduateName} — دعوة حفل التخرج`;


  const ogTitle =
    document.querySelector(
      'meta[property="og:title"]'
    );

  const ogDescription =
    document.querySelector(
      'meta[property="og:description"]'
    );


  if (ogTitle) {

    ogTitle.setAttribute(
      "content",
      `${GRADUATION.graduateName} — دعوة حفل التخرج`
    );

  }


  if (ogDescription) {

    ogDescription.setAttribute(
      "content",
      GRADUATION.invitationText
    );

  }

}


/* =========================================================
   ACADEMIC YEARS
========================================================= */

function createAcademicYears() {

  academicYearsContainer.innerHTML =
    "";


  GRADUATION.academicYears.forEach(
    (year, index) => {

      const article =
        document.createElement(
          "article"
        );


      article.className =
        "year-row";


      article.dataset.index =
        String(index);


      article.innerHTML = `
        <span class="year-index">
          ${toArabicDigits(index + 1)}
        </span>

        <div class="year-copy">

          <strong>
            ${escapeHTML(year.title)}
          </strong>

          <span>
            ${escapeHTML(year.subtitle || "")}
          </span>

        </div>

        <div class="year-result">

          <span class="result-label">
            قيد المراجعة
          </span>

          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
          >

            <circle
              cx="16"
              cy="16"
              r="13"
            ></circle>

            <path
              class="check-path"
              d="M9.5 16.5L14 21L23 11.5"
            ></path>

          </svg>

        </div>
      `;


      academicYearsContainer
        .appendChild(article);

    }
  );


  updateYearsProgress(0);

}


/* =========================================================
   VERIFICATION BUTTON
========================================================= */

function setupVerification() {

  verifyButton.addEventListener(
    "click",
    () => {

      if (verificationRunning) {
        return;
      }


      if (verificationFinished) {

        celebration.scrollIntoView({
          behavior:
            reducedMotion
              ? "auto"
              : "smooth"
        });

        return;
      }


      runVerification();

    }
  );

}


/* =========================================================
   MAIN GSAP SEQUENCE
========================================================= */

function runVerification() {

  if (
    reducedMotion ||
    typeof gsap === "undefined"
  ) {

    completeImmediately();
    return;
  }


  verificationRunning =
    true;

  verifyButton.disabled =
    true;


  statusDot.classList.add(
    "is-processing"
  );


  verificationMessage.textContent =
    "جارٍ مراجعة السجل الأكاديمي...";


  documentState.textContent =
    "قيد المراجعة";


  const rows =
    [
      ...document.querySelectorAll(
        ".year-row"
      )
    ];


  const timeline =
    gsap.timeline({

      defaults: {
        ease:
          "power2.inOut"
      },

      onComplete: () => {

        verificationRunning =
          false;

        verificationFinished =
          true;

        verifyButton.disabled =
          false;

        verifyButton
          .querySelector("span")
          .textContent =
            "عرض تفاصيل الاحتفال";

      }

    });


  rows.forEach(
    (row, index) => {

      const check =
        row.querySelector(
          ".check-path"
        );

      const label =
        row.querySelector(
          ".result-label"
        );


      const start =
        index * 0.72;


      timeline

        .to(
          row,
          {
            backgroundColor:
              "rgba(23, 77, 59, 0.035)",

            duration: 0.25
          },
          start
        )

        .call(
          () => {

            verificationMessage
              .textContent =
                `جارٍ اعتماد ${GRADUATION.academicYears[index].title}...`;

          },
          null,
          start + 0.15
        )

        .to(
          check,
          {
            strokeDashoffset: 0,
            duration: 0.42,
            ease:
              "power2.out"
          },
          start + 0.25
        )

        .call(
          () => {

            row.classList.add(
              "is-complete"
            );

            label.textContent =
              "مكتملة";

            updateYearsProgress(
              index + 1
            );

          },
          null,
          start + 0.43
        );

    }
  );


  const afterRows =
    rows.length * 0.72 + 0.2;


  timeline

    .call(
      () => {

        verificationMessage.textContent =
          "تم استكمال جميع المتطلبات الأكاديمية.";

        finalStatusText.textContent =
          "تم استكمال المتطلبات";

        finalStatusSub.textContent =
          "جارٍ إصدار الحالة النهائية للسجل الأكاديمي.";

      },
      null,
      afterRows
    )

    .to(
      finalStatusText,
      {
        opacity: 0.35,
        y: 5,
        duration: 0.22
      },
      afterRows + 0.35
    )

    .call(
      () => {

        finalStatusText.textContent =
          "متخرج";

        finalStatusSub.textContent =
          "تم اعتماد النتيجة النهائية وإغلاق السجل الأكاديمي بنجاح.";

        documentState.textContent =
          "معتمد";

      },
      null,
      afterRows + 0.62
    )

    .to(
      finalStatusText,
      {
        opacity: 1,
        y: 0,
        duration: 0.34
      },
      afterRows + 0.63
    )

    .call(
      () => {

        prepareStamp();

      },
      null,
      afterRows + 0.65
    )

    .to(
      stampPlaceholder,
      {
        opacity: 0,
        duration: 0.18
      },
      afterRows + 0.75
    )

    .to(
      stampCanvas,
      {
        opacity: 1,

        scale: 1,

        rotation: -8,

        duration: 0.28,

        ease:
          "back.out(2.2)"
      },
      afterRows + 0.86
    )

    .to(
      stampArea,
      {
        y: 3,
        duration: 0.06,

        yoyo: true,

        repeat: 1
      },
      afterRows + 1.07
    )

    .call(
      () => {

        statusDot.classList.remove(
          "is-processing"
        );

        statusDot.classList.add(
          "is-complete"
        );


        verificationMessage.textContent =
          "تم اعتماد السجل الأكاديمي — متخرج";


        celebration.classList.add(
          "is-revealed"
        );

      },
      null,
      afterRows + 1.25
    )

    .fromTo(
      celebration,
      {
        y: 20
      },
      {
        y: 0,
        duration: 0.65
      },
      afterRows + 1.3
    );

}


/* =========================================================
   REDUCED MOTION / FALLBACK
========================================================= */

function completeImmediately() {

  const rows =
    document.querySelectorAll(
      ".year-row"
    );


  rows.forEach(
    (row) => {

      row.classList.add(
        "is-complete"
      );


      const check =
        row.querySelector(
          ".check-path"
        );


      const label =
        row.querySelector(
          ".result-label"
        );


      check.style.strokeDashoffset =
        "0";


      label.textContent =
        "مكتملة";

    }
  );


  updateYearsProgress(
    GRADUATION.academicYears.length
  );


  documentState.textContent =
    "معتمد";


  finalStatusText.textContent =
    "متخرج";


  finalStatusSub.textContent =
    "تم اعتماد النتيجة النهائية وإغلاق السجل الأكاديمي بنجاح.";


  statusDot.classList.add(
    "is-complete"
  );


  verificationMessage.textContent =
    "تم اعتماد السجل الأكاديمي — متخرج";


  prepareStamp();


  stampPlaceholder.style.opacity =
    "0";


  stampCanvas.style.opacity =
    "1";


  stampCanvas.style.transform =
    "scale(1) rotate(-8deg)";


  celebration.classList.add(
    "is-revealed"
  );


  verificationFinished =
    true;


  verifyButton
    .querySelector("span")
    .textContent =
      "عرض تفاصيل الاحتفال";

}


/* =========================================================
   PROGRESS
========================================================= */

function updateYearsProgress(
  completed
) {

  const total =
    GRADUATION.academicYears.length;


  yearsProgress.textContent =
    `${toArabicDigits(completed)} / ${toArabicDigits(total)}`;

}


/* =========================================================
   CANVAS STAMP
========================================================= */

async function waitForFonts() {

  if (document.fonts?.ready) {

    try {

      await document.fonts.ready;

    } catch {
      /* fallback silently */
    }

  }

}


function setupStampCanvas() {

  prepareStamp();

}


function prepareStamp() {

  const size =
    Math.max(
      180,
      Math.round(
        stampArea.getBoundingClientRect()
          .width
      )
    );


  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );


  stampCanvas.width =
    Math.round(
      size * dpr
    );


  stampCanvas.height =
    Math.round(
      size * dpr
    );


  stampCanvas.style.width =
    `${size}px`;


  stampCanvas.style.height =
    `${size}px`;


  const context =
    stampCanvas.getContext(
      "2d"
    );


  if (!context) {
    return;
  }


  context.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );


  drawStamp(
    context,
    size
  );

}


function drawStamp(
  context,
  size
) {

  context.clearRect(
    0,
    0,
    size,
    size
  );


  const center =
    size / 2;


  const outerRadius =
    size * 0.39;


  const innerRadius =
    size * 0.32;


  const color =
    "#9b3f36";


  context.save();


  context.translate(
    center,
    center
  );


  context.rotate(
    -0.04
  );


  context.strokeStyle =
    color;


  context.fillStyle =
    color;


  context.globalAlpha =
    0.88;


  /* OUTER CIRCLE */

  context.lineWidth =
    Math.max(
      2,
      size * 0.012
    );


  context.beginPath();

  context.arc(
    0,
    0,
    outerRadius,
    0,
    Math.PI * 2
  );

  context.stroke();


  /* INNER CIRCLE */

  context.lineWidth =
    Math.max(
      1,
      size * 0.005
    );


  context.beginPath();

  context.arc(
    0,
    0,
    innerRadius,
    0,
    Math.PI * 2
  );

  context.stroke();


  /* CENTER WORD */

  context.textAlign =
    "center";


  context.textBaseline =
    "middle";


  context.font =
    `700 ${Math.round(
      size * 0.13
    )}px "Noto Kufi Arabic", sans-serif`;


  context.fillText(
    "متخرج",
    0,
    -2
  );


  /* TOP SMALL TEXT */

  context.font =
    `600 ${Math.round(
      size * 0.043
    )}px "Noto Kufi Arabic", sans-serif`;


  context.fillText(
    "الحالة النهائية",
    0,
    -size * 0.215
  );


  /* BOTTOM SMALL TEXT */

  context.fillText(
    "سجل أكاديمي معتمد",
    0,
    size * 0.225
  );


  /* DECORATIVE DOTS */

  const dotRadius =
    size * 0.012;


  [
    [-size * 0.245, 0],
    [size * 0.245, 0]
  ]
    .forEach(
      ([x, y]) => {

        context.beginPath();

        context.arc(
          x,
          y,
          dotRadius,
          0,
          Math.PI * 2
        );

        context.fill();

      }
    );


  /*
    Ink imperfections.
    Canvas API is used here intentionally
    to create a slightly imperfect physical
    stamp rather than a clean CSS circle.
  */

  context.globalAlpha =
    0.13;


  for (
    let i = 0;
    i < 90;
    i++
  ) {

    const angle =
      Math.random() *
      Math.PI *
      2;


    const radius =
      outerRadius *
      (
        0.82 +
        Math.random() *
        0.2
      );


    const x =
      Math.cos(angle) *
      radius;


    const y =
      Math.sin(angle) *
      radius;


    const length =
      1 +
      Math.random() * 5;


    context.lineWidth =
      0.8 +
      Math.random();


    context.beginPath();


    context.moveTo(
      x,
      y
    );


    context.lineTo(
      x +
      Math.cos(angle) *
      length,

      y +
      Math.sin(angle) *
      length
    );


    context.stroke();

  }


  /* RANDOM INK SPECKS */

  for (
    let i = 0;
    i < 55;
    i++
  ) {

    const angle =
      Math.random() *
      Math.PI *
      2;


    const radius =
      Math.random() *
      outerRadius;


    const x =
      Math.cos(angle) *
      radius;


    const y =
      Math.sin(angle) *
      radius;


    context.beginPath();


    context.arc(
      x,
      y,
      Math.random() * 1.3,
      0,
      Math.PI * 2
    );


    context.fill();

  }


  context.restore();

}


/* =========================================================
   DATE
========================================================= */

function setupDate() {

  const date =
    new Date(
      GRADUATION.startAt
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return;
  }


  const dateFormatter =
    new Intl.DateTimeFormat(
      "ar-IQ-u-nu-arab",
      {

        weekday:
          "long",

        day:
          "numeric",

        month:
          "long",

        year:
          "numeric",

        timeZone:
          GRADUATION.timeZone

      }
    );


  const timeFormatter =
    new Intl.DateTimeFormat(
      "ar-IQ-u-nu-arab",
      {

        hour:
          "numeric",

        minute:
          "2-digit",

        hour12:
          true,

        timeZone:
          GRADUATION.timeZone

      }
    );


  document.getElementById(
    "formattedDate"
  ).textContent =
    dateFormatter.format(date);


  document.getElementById(
    "formattedTime"
  ).textContent =
    timeFormatter.format(date);


  document.getElementById(
    "fullAddress"
  ).textContent =
    [
      GRADUATION.address,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join("، ");

}


/* =========================================================
   GOOGLE MAPS
========================================================= */

function setupMaps() {

  mapsButton.href =
    getMapsUrl();

}


function getMapsUrl() {

  if (
    GRADUATION.mapsUrl &&
    GRADUATION.mapsUrl.trim()
  ) {

    return GRADUATION.mapsUrl;

  }


  const query =
    [
      GRADUATION.venue,
      GRADUATION.address,
      GRADUATION.city,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join(", ");


  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(query)
  );

}


/* =========================================================
   CALENDAR
========================================================= */

function setupCalendar() {

  calendarButton.addEventListener(
    "click",
    downloadCalendar
  );

}


function downloadCalendar() {

  const start =
    new Date(
      GRADUATION.startAt
    );


  const end =
    new Date(
      GRADUATION.endAt
    );


  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {

    return;
  }


  const title =
    `احتفال تخرج ${GRADUATION.graduateName}`;


  const location =
    [
      GRADUATION.venue,
      GRADUATION.address,
      GRADUATION.city,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join("، ");


  const shareUrl =
    getShareUrl();


  const description =
    [
      GRADUATION.invitationText,
      GRADUATION.degree,
      GRADUATION.university,
      shareUrl
        ? `رابط الدعوة: ${shareUrl}`
        : ""
    ]
      .filter(Boolean)
      .join("\\n");


  const content =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//InviteUs//Academic Transcript Graduation//AR
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@inviteus.party
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${escapeICS(title)}
DESCRIPTION:${escapeICS(description)}
LOCATION:${escapeICS(location)}
URL:${escapeICS(shareUrl)}
END:VEVENT
END:VCALENDAR`;


  const blob =
    new Blob(
      [content],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const anchor =
    document.createElement(
      "a"
    );


  anchor.href =
    url;


  anchor.download =
    "graduation-invitation.ics";


  document.body.appendChild(
    anchor
  );


  anchor.click();


  anchor.remove();


  URL.revokeObjectURL(
    url
  );

}


function formatICSDate(
  date
) {

  return date
    .toISOString()
    .replace(
      /[-:]/g,
      ""
    )
    .replace(
      /\.\d{3}/,
      ""
    );

}


function escapeICS(
  value = ""
) {

  return String(value)

    .replace(
      /\\/g,
      "\\\\"
    )

    .replace(
      /,/g,
      "\\,"
    )

    .replace(
      /;/g,
      "\\;"
    )

    .replace(
      /\n/g,
      "\\n"
    );

}


/* =========================================================
   SHARE
========================================================= */

function setupShare() {

  shareButton.addEventListener(
    "click",
    shareInvitation
  );

}


async function shareInvitation() {

  const title =
    `${GRADUATION.graduateName} — دعوة حفل التخرج`;


  const text =
    `${GRADUATION.invitationText} ${GRADUATION.graduateName} — ${GRADUATION.classYear}`;


  const url =
    getShareUrl();


  try {

    if (
      navigator.share
    ) {

      await navigator.share({
        title,
        text,
        url
      });


      showShareFeedback(
        "تمت مشاركة الدعوة بنجاح."
      );


      return;

    }


    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        url
      );


      showShareFeedback(
        "تم نسخ رابط الدعوة."
      );


      return;

    }


    fallbackCopy(
      url
    );


    showShareFeedback(
      "تم نسخ رابط الدعوة."
    );

  } catch (error) {

    if (
      error?.name ===
      "AbortError"
    ) {

      return;

    }


    try {

      fallbackCopy(
        url
      );


      showShareFeedback(
        "تم نسخ رابط الدعوة."
      );

    } catch {

      showShareFeedback(
        "يمكنك نسخ الرابط من شريط المتصفح."
      );

    }

  }

}


function getShareUrl() {

  if (
    GRADUATION.shareUrl &&
    GRADUATION.shareUrl.trim()
  ) {

    return GRADUATION.shareUrl;

  }


  return window.location.href;

}


function fallbackCopy(
  value
) {

  const textarea =
    document.createElement(
      "textarea"
    );


  textarea.value =
    value;


  textarea.setAttribute(
    "readonly",
    ""
  );


  textarea.style.position =
    "fixed";


  textarea.style.opacity =
    "0";


  document.body.appendChild(
    textarea
  );


  textarea.select();


  document.execCommand(
    "copy"
  );


  textarea.remove();

}


function showShareFeedback(
  message
) {

  shareFeedback.textContent =
    message;


  window.clearTimeout(
    showShareFeedback.timer
  );


  showShareFeedback.timer =
    window.setTimeout(
      () => {

        shareFeedback.textContent =
          "";

      },
      3500
    );

}


/* =========================================================
   UTILITIES
========================================================= */

function toArabicDigits(
  value
) {

  const numbers =
    "٠١٢٣٤٥٦٧٨٩";


  return String(value)
    .replace(
      /\d/g,
      digit =>
        numbers[
          Number(digit)
        ]
    );

}


function escapeHTML(
  value = ""
) {

  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================================
   RESIZE CANVAS
========================================================= */

let resizeTimer;


window.addEventListener(
  "resize",
  () => {

    window.clearTimeout(
      resizeTimer
    );


    resizeTimer =
      window.setTimeout(
        () => {

          prepareStamp();

        },
        150
      );

  }
);
