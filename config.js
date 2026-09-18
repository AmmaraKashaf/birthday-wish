/* ============================================================
   💖  EDIT EVERYTHING HERE  💖
   This is the ONLY file you need to touch to personalise the site.
   ============================================================ */

const BIRTHDAY_CONFIG = {

  /* ---------- PAGE 1 : the landing / hero ---------- */
  heroLine1: "Happiest Birthday Pretty Ladki 🎉",
  heroLine2: "Happy 23, Areeba! 💖",
  heroSubtitle: "a little corner of the internet, made just for you",


  /* ---------- PAGE 2 : the photo slideshow ---------- */
  galleryTitle: "Memories We Made 💫",
  gallerySubtitle: "Our beautiful moments 🌸",

  /* How long each photo stays on screen (milliseconds) */
  slideDuration: 4000,

  /* Every photo in the slideshow.
     Drop your pictures into  public/images/  then either:
       • add their file names to this list by hand, or
       • right-click update-photos.ps1 → "Run with PowerShell"
         and it will fill this list in for you automatically.
     Any photo that is missing is simply skipped — nothing breaks. */
  photos: [
    "public/images/photo1.jpg",
    "public/images/photo2.jpg",
    "public/images/photo3.jpg",
    "public/images/photo4.jpg",
    "public/images/photo5.jpg",
    "public/images/photo6.jpg",
    "public/images/photo7.jpg",
    "public/images/photo8.jpg",
    "public/images/photo9.jpg",
    "public/images/photo10.jpg",
    "public/images/photo11.jpg",
    "public/images/photo12.jpg",
    "public/images/photo13.jpg",
    "public/images/photo14.jpg",
    "public/images/photo15.jpg",
    "public/images/photo16.jpg",
    "public/images/photo17.jpg",
    "public/images/photo18.jpg",
  ],


  /* ---------- PAGE 3 : the birthday wish ---------- */

  /* The one special photo shown above the wish */
  specialPhoto: "public/images/special.jpg",

  wishTitle: "For you, Areeba 🌷",

  /* ⬇⬇⬇  WRITE YOUR WISH HERE  ⬇⬇⬇
     Leave a blank line between paragraphs — each block becomes its own
     paragraph on the card. Keep the backticks at the start and the end. */
  wish: `My dearest Areeba,

Twenty-three looks so good on you. I wanted to give you something that wasn't wrapping paper and ribbon — something you could open whenever the day gets heavy and be reminded of how deeply you are loved.

Thank you for every late-night conversation, every terrible joke, every time you showed up for me without being asked. You make the ordinary days feel like something worth remembering.

Here's to a year that is kind to you. May it bring you everything you've been quietly hoping for, and a few beautiful things you never thought to ask for.

Happy birthday, pretty ladki. 🎂`,
  /* ⬆⬆⬆  END OF WISH  ⬆⬆⬆ */

  signoff: "With all my love 💖",


  /* ---------- OPTIONAL : background music ---------- */
  /* Put an .mp3 at public/audio/song.mp3 and a music toggle button appears
     by itself. If the file isn't there, the button stays hidden. */
  music: "public/audio/song.mp3",


  /* ---------- Browser tab title ---------- */
  pageTitle: "Happy 23rd Birthday, Areeba 💖",
};
