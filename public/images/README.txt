PUT AREEBA'S PHOTOS IN THIS FOLDER
==================================

1. Copy all the birthday / memory photos into this folder
   (public/images/). Any names are fine — photo1.jpg, beach.jpg, IMG_2043.jpg.

   Supported: .jpg  .jpeg  .png  .webp  .gif  .avif

2. Pick the ONE special photo for the wish page and name it exactly:

       special.jpg

   (If yours is a .png, either rename it to special.jpg or change
    "specialPhoto" at the bottom of config.js.)

3. Tell the site which photos to show. Easiest way:

       Go up one level to the project folder,
       right-click  update-photos.ps1  ->  "Run with PowerShell"

   That scans this folder and fills in the photo list in config.js for you.
   (special.jpg is left out of the slideshow automatically.)

   Or do it by hand: open config.js and list them under "photos", like

       photos: [
         "public/images/photo1.jpg",
         "public/images/photo2.jpg",
       ],

TIPS
----
* Landscape photos look best as slideshow backgrounds; a portrait photo
  works beautifully as special.jpg.
* Keep each file under ~2 MB so the site loads fast on phones.
  Anything over 3000px wide is bigger than it needs to be.
* Photos listed in config.js but missing from this folder are simply
  skipped — the site will not break.
