# Replace demo pictures

All110 demo pictures are local in public/images/demo/. No runtime image requests go to the museum.

1. Find the image in the table below.
2. Replace that file with your own WebP image using the same filename and folder.
3. If dimensions, description, crop or file type change, update that key in src/content/images.json (exposed through src/config/site.ts). Set width/height to the actual image dimensions, alt to the new description, and credit to its actual source/license.
4. Run npm run check and npm run build, then preview desktop and mobile.

Ratios below are displayed crops, not forced file shapes. Hero and collaborations banner use4:5 on mobile. Gallery lightboxes retain natural picture proportions. Work and Available share40pictures; replace once for both. Logo, social icons and existing GIF/poster are separate and unchanged. These are temporary demo images, not the named client’s own works. Source/license evidence: docs/demo-image-sources.json. Update that record when replacing a demo with a different third-party picture.

| Area | Image key | File inside public/ | Display ratio |
|---|---|---|---|
| home | homeHero | images/demo/home/hero.webp | 3:2 |
| home | homeIntroSide | images/demo/home/introduction.webp | 3:2 |
| home | collaborationBackdrop | images/demo/home/collaborations-banner.webp | 2:1 |
| home | aboutPreview | images/demo/home/about-preview.webp | 4:3 |
| home | pressPreview | images/demo/home/press-preview.webp | 2:3 |
| home | archivePreview | images/demo/home/archive-preview.webp | 2:3 |
| home | artworkDetail | images/demo/home/artwork-detail.webp | 1:1 |
| home | contactPreview | images/demo/home/contact-preview.webp | 3:2 |
| home | studioWide | images/demo/home/studio-banner.webp | 3:2 |
| home | social1 | images/demo/home/social-01.webp | 1:1 |
| home | social2 | images/demo/home/social-02.webp | 1:1 |
| home | social3 | images/demo/home/social-03.webp | 1:1 |
| home | social4 | images/demo/home/social-04.webp | 1:1 |
| home | social5 | images/demo/home/social-05.webp | 1:1 |
| home | social6 | images/demo/home/social-06.webp | 1:1 |
| about | aboutImage1 | images/demo/about/image-01.webp | 4:5 |
| about | aboutImage2 | images/demo/about/image-02.webp | 4:3 |
| about | aboutImage3 | images/demo/about/image-03.webp | 4:3 |
| about | aboutImage4 | images/demo/about/image-04.webp | 4:3 |
| about | aboutImage5 | images/demo/about/image-05.webp | 4:3 |
| the-process | the-processImage1 | images/demo/the-process/image-01.webp | 4:5 |
| the-process | the-processImage2 | images/demo/the-process/image-02.webp | 4:3 |
| the-process | the-processImage3 | images/demo/the-process/image-03.webp | 4:3 |
| the-process | the-processImage4 | images/demo/the-process/image-04.webp | 4:3 |
| the-process | the-processImage5 | images/demo/the-process/image-05.webp | 4:3 |
| the-process | the-processImage6 | images/demo/the-process/image-06.webp | 4:3 |
| press | pressImage1 | images/demo/press/image-01.webp | 4:5 |
| press | pressImage2 | images/demo/press/image-02.webp | 4:3 |
| collaborations | collaborationsImage1 | images/demo/collaborations/image-01.webp | 4:5 |
| collaborations | collaborationsImage2 | images/demo/collaborations/image-02.webp | 4:3 |
| collaborations | collaborationsImage3 | images/demo/collaborations/image-03.webp | 4:3 |
| collaborations | collaborationsImage4 | images/demo/collaborations/image-04.webp | 4:3 |
| collaborations | collaborationsImage5 | images/demo/collaborations/image-05.webp | 4:3 |
| collaborations | collaborationsImage6 | images/demo/collaborations/image-06.webp | 4:3 |
| pagerie-lana-gomez-luxury-bags | pagerie-lana-gomez-luxury-bagsImage1 | images/demo/pagerie-lana-gomez-luxury-bags/image-01.webp | 4:5 |
| pagerie-lana-gomez-luxury-bags | pagerie-lana-gomez-luxury-bagsImage2 | images/demo/pagerie-lana-gomez-luxury-bags/image-02.webp | 4:3 |
| pagerie-lana-gomez-luxury-bags | pagerie-lana-gomez-luxury-bagsImage3 | images/demo/pagerie-lana-gomez-luxury-bags/image-03.webp | 4:3 |
| pagerie-lana-gomez-luxury-bags | pagerie-lana-gomez-luxury-bagsImage4 | images/demo/pagerie-lana-gomez-luxury-bags/image-04.webp | 4:3 |
| pagerie-lana-gomez-luxury-bags | pagerie-lana-gomez-luxury-bagsImage5 | images/demo/pagerie-lana-gomez-luxury-bags/image-05.webp | 4:3 |
| pagerie-lana-gomez-luxury-bags | pagerie-lana-gomez-luxury-bagsImage6 | images/demo/pagerie-lana-gomez-luxury-bags/image-06.webp | 4:3 |
| shay-lanagomez-luxury-jewelry-collection | shay-lanagomez-luxury-jewelry-collectionImage1 | images/demo/shay-lanagomez-luxury-jewelry-collection/image-01.webp | 4:5 |
| shay-lanagomez-luxury-jewelry-collection | shay-lanagomez-luxury-jewelry-collectionImage2 | images/demo/shay-lanagomez-luxury-jewelry-collection/image-02.webp | 4:3 |
| shay-lanagomez-luxury-jewelry-collection | shay-lanagomez-luxury-jewelry-collectionImage3 | images/demo/shay-lanagomez-luxury-jewelry-collection/image-03.webp | 4:3 |
| shay-lanagomez-luxury-jewelry-collection | shay-lanagomez-luxury-jewelry-collectionImage4 | images/demo/shay-lanagomez-luxury-jewelry-collection/image-04.webp | 4:3 |
| shay-lanagomez-luxury-jewelry-collection | shay-lanagomez-luxury-jewelry-collectionImage5 | images/demo/shay-lanagomez-luxury-jewelry-collection/image-05.webp | 4:3 |
| shay-lanagomez-luxury-jewelry-collection | shay-lanagomez-luxury-jewelry-collectionImage6 | images/demo/shay-lanagomez-luxury-jewelry-collection/image-06.webp | 4:3 |
| shay-lanagomez-luxury-jewelry-collection | shay-lanagomez-luxury-jewelry-collectionImage7 | images/demo/shay-lanagomez-luxury-jewelry-collection/image-07.webp | 4:3 |
| shay-lanagomez-luxury-jewelry-collection | shay-lanagomez-luxury-jewelry-collectionImage8 | images/demo/shay-lanagomez-luxury-jewelry-collection/image-08.webp | 4:3 |
| available | available-1Image | images/demo/available/artwork-01.webp | 4:5 |
| available | available-2Image | images/demo/available/artwork-02.webp | 4:5 |
| available | available-3Image | images/demo/available/artwork-03.webp | 4:5 |
| available | available-4Image | images/demo/available/artwork-04.webp | 4:5 |
| available | available-5Image | images/demo/available/artwork-05.webp | 4:5 |
| available | available-6Image | images/demo/available/artwork-06.webp | 4:5 |
| available | available-7Image | images/demo/available/artwork-07.webp | 4:5 |
| available | available-8Image | images/demo/available/artwork-08.webp | 4:5 |
| available | available-9Image | images/demo/available/artwork-09.webp | 4:5 |
| available | available-10Image | images/demo/available/artwork-10.webp | 4:5 |
| available | available-11Image | images/demo/available/artwork-11.webp | 4:5 |
| available | available-12Image | images/demo/available/artwork-12.webp | 4:5 |
| available | available-13Image | images/demo/available/artwork-13.webp | 4:5 |
| available | available-14Image | images/demo/available/artwork-14.webp | 4:5 |
| available | available-15Image | images/demo/available/artwork-15.webp | 4:5 |
| available | available-16Image | images/demo/available/artwork-16.webp | 4:5 |
| available | available-17Image | images/demo/available/artwork-17.webp | 4:5 |
| available | available-18Image | images/demo/available/artwork-18.webp | 4:5 |
| available | available-19Image | images/demo/available/artwork-19.webp | 4:5 |
| available | available-20Image | images/demo/available/artwork-20.webp | 4:5 |
| available | available-21Image | images/demo/available/artwork-21.webp | 4:5 |
| available | available-22Image | images/demo/available/artwork-22.webp | 4:5 |
| available | available-23Image | images/demo/available/artwork-23.webp | 4:5 |
| available | available-24Image | images/demo/available/artwork-24.webp | 4:5 |
| available | available-25Image | images/demo/available/artwork-25.webp | 4:5 |
| available | available-26Image | images/demo/available/artwork-26.webp | 4:5 |
| available | available-27Image | images/demo/available/artwork-27.webp | 4:5 |
| available | available-28Image | images/demo/available/artwork-28.webp | 4:5 |
| available | available-29Image | images/demo/available/artwork-29.webp | 4:5 |
| available | available-30Image | images/demo/available/artwork-30.webp | 4:5 |
| available | available-31Image | images/demo/available/artwork-31.webp | 4:5 |
| available | available-32Image | images/demo/available/artwork-32.webp | 4:5 |
| available | available-33Image | images/demo/available/artwork-33.webp | 4:5 |
| available | available-34Image | images/demo/available/artwork-34.webp | 4:5 |
| available | available-35Image | images/demo/available/artwork-35.webp | 4:5 |
| available | available-36Image | images/demo/available/artwork-36.webp | 4:5 |
| available | available-37Image | images/demo/available/artwork-37.webp | 4:5 |
| available | available-38Image | images/demo/available/artwork-38.webp | 4:5 |
| available | available-39Image | images/demo/available/artwork-39.webp | 4:5 |
| available | available-40Image | images/demo/available/artwork-40.webp | 4:5 |
| archived | archived-1Image | images/demo/archived/artwork-01.webp | 4:5 |
| archived | archived-2Image | images/demo/archived/artwork-02.webp | 4:5 |
| archived | archived-3Image | images/demo/archived/artwork-03.webp | 4:5 |
| archived | archived-4Image | images/demo/archived/artwork-04.webp | 4:5 |
| archived | archived-5Image | images/demo/archived/artwork-05.webp | 4:5 |
| archived | archived-6Image | images/demo/archived/artwork-06.webp | 4:5 |
| archived | archived-7Image | images/demo/archived/artwork-07.webp | 4:5 |
| archived | archived-8Image | images/demo/archived/artwork-08.webp | 4:5 |
| archived | archived-9Image | images/demo/archived/artwork-09.webp | 4:5 |
| archived | archived-10Image | images/demo/archived/artwork-10.webp | 4:5 |
| archived | archived-11Image | images/demo/archived/artwork-11.webp | 4:5 |
| archived | archived-12Image | images/demo/archived/artwork-12.webp | 4:5 |
| archived | archived-13Image | images/demo/archived/artwork-13.webp | 4:5 |
| archived | archived-14Image | images/demo/archived/artwork-14.webp | 4:5 |
| archived | archived-15Image | images/demo/archived/artwork-15.webp | 4:5 |
| archived | archived-16Image | images/demo/archived/artwork-16.webp | 4:5 |
| archived | archived-17Image | images/demo/archived/artwork-17.webp | 4:5 |
| archived | archived-18Image | images/demo/archived/artwork-18.webp | 4:5 |
| archived | archived-19Image | images/demo/archived/artwork-19.webp | 4:5 |
| archived | archived-20Image | images/demo/archived/artwork-20.webp | 4:5 |
| archived | archived-21Image | images/demo/archived/artwork-21.webp | 4:5 |
| archived | archived-22Image | images/demo/archived/artwork-22.webp | 4:5 |
