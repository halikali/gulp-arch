import Swiper from '../../../vendors/swiper/js/swiper-bundle.esm.browser.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ISlider {
  selector: string;
  options: object;
}

const sliders: ISlider[] = [
  {
    selector: '.mySwiper',
    options: {
      pagination: {
        el: '.swiper-pagination',
      },
    },
  },
  {
    selector: '.mySwiper2',
    options: {
      pagination: {
        el: '.swiper-pagination',
      },
    },
  },
  {
    selector: '.mySwiper3',
    options: {
      pagination: {
        el: '.swiper-pagination',
      },
      loop: true,
    },
  },
];

const initializeSliders = () => {
  const currentSliders = sliders.filter(({ selector }) =>
    document.querySelector(selector),
  );

  currentSliders.forEach(({ selector, options }) => {
    console.log(`${selector} seçicisine sahip slider aktifleştirildi.`);
    new Swiper(selector, options);
  });
};

initializeSliders();
