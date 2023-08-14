# EN

# Gulp Modular Architecture

This project aims to build a modular architecture with Gulp and manage files in a systematic way. 

### General Information
- With this project, all code is automatically passed through Eslint and Prettier before committing so that teams or individuals can continue to write code to the same standard.
If the code that does not meet the specified standard cannot be automatically corrected, the commit fails and the commit must be resubmitted after manual editing.
  
- Environment segregation
    
    a) Development environment
        
        - Map files are automatically created for JavaScript files.
        - JavaScript files are not compressed.
        - JavaScript files are passed through Babel for browser compatibility
        - SCSS files are not compressed.
        - SCSS files are passed through the Prefixer for browser compatibility.

    b) Product environment

        - For JavaScript files, map files are automatically removed.
        - Compression is applied to JavaScript files.
        - All console code for JavaScript is removed.
        - JavaScript files are passed through Babel for browser compatibility
        - SCSS files are compressed. 
        - SCSS files are passed through Prefixer for browser compatibility.
  
## To start using the Project

### Node Version: V18.14.1

**In order for the application to run successfully, you must use your node version with the version specified above.** 

Clone this project

```bash
  git clone https://github.com/halikali/gulp-arch.git
```

Open the project in the terminal

```bash
  cd gulp-arch
```


Download dependencies

```bash
  npm install
```

## Or

Through the terminal 
```bash
  npx create-gulp-arch <application_name>
```
command to install the dependencies automatically. **This method will automatically download the dependencies.**

## About File System
- assets 

     This folder contains images etc. that will be used for the page. Their sizes are reduced and optimized during compilation. 

- components
    The components to be used on the page are located under this folder. A file is opened for each component and contains TypeScript and SCSS files. 

    Each folder contains a file named options.json and is configured as follows:
  
    ```json
    {
       "exportable": false
    }
    ```

     If this value is `true` the component will be extracted separately under the `dist/components` folder, if `false` the component will not be compiled under the `dist` folder.

- fonts

    Custom font files can be used under this folder.


- scripts

    TypeScript files are located under this folder. Unless `index.ts` and `depends.json` files are located under a folder, the files are not compiled externally. They can only be used by combining them with other files.
    The files for the pages should be located under the `pages` folder. You can create as many `.ts` extension files as you want in the folder, only the `index.ts` file will be compiled.

    depends.json file is structured as follows:
  
    ```json
    {
        "components": [
            "./src/scripts/utils/example-util.ts"
        ]
    }
    ```
    Here the files specified in the array under the components key are compiled by concatenating them with the `index.ts` file in the folder. 
    
     **When specifying the path of the files to be merged, it must be specified from the root directory.**

- styles

    The style files to be used in the application are located here. All style files can be used in any folder structure, but only files with `.scss` extension that do not start with `_` will be compiled. 
    For example, `_base.scss` will not be compiled, while `base.scss` will be compiled. The compiled style files are compiled by passing them through the prefixer for browser compatibility.

- vendors

    The minified files of 3rd party packages to be used in the application are located here. During compilation, this folder will not undergo any compilation process and will be moved to dist to preserve the folder structure.

- views

    HTML files are located under this folder. In the browser it will be published under `http://localhost:64208/views/` but the index.html file will also be published under `http://localhost:64208/`.

## Commands You Can Use

#### The gulp commands you can use in the project and their working logic are explained below.

- `gulp`

     It is the standard Gulp command. It only compiles TypeScript and SCSS files.


- `gulp --only <folder_name>`

    Compiles TypeScript and SCSS files only for the specified folder.
    For example, `gulp --only homepage ` will compile `src/scripts/pages/homepage/index.ts` and `src/styles/pages/homepage/homepage/homepage.scss`.

    **This compilation works for TypeScript only for `index.ts` files and for SCSS for all `.scss` files whose filename does not start with `_`.

- `gulp build`

    All files are compiled but change states are not reflected. It is a one-time compile and stop command.

- `gulp dev`

    All files are compiled and changes to files are detected and the relevant tasks are automatically run for the changed files.

- `npm run build:dev`

    All files are compiled, but compiled in such a way that the `.env.dev` env file is executed. It does not keep track of the files after the compilation process is finished, it runs once and stops.

    
- `npm run build:prod`

    All files are compiled, but the `.env.prod` env file is compiled to run. It does not keep track of the files after the compilation process is finished, it runs once and stops.

-------------------------------------------------------------------------------------------------------------------------------------------------------

# TR

# Gulp Modüler Mimarisi

Bu proje Gulp ile modüler bir mimari kurgulamayı ve dosyaları sistematik bir biçimde yönetmeyi amaçlamaktadır. 

### Genel Bilgilendirme
- Bu proje ile ekipçe veya bireysel olarak aynı standartta kod yazmaya devam edilebilmesi için tüm kodlar commit işlemi öncesinde otomatik olarak Eslint ve Prettier'dan geçirilir. Belirlenen standarta uymayan kodlar otomatik olarak düzeltilemezse commit gönderme işlemi başarısız olur ve manuel düzenleme yapıldıktan sonra tekrar commit gönderme işlemi yapılması gerekir.

- Ortam ayrımı
    
    a) Geliştirme ortamı
        
        - JavaScript dosyaları için otomatik olarak map dosyaları oluşturulur.
        - JavaScript dosyalarına sıkıştırma işlemi uygulanmaz.
        - JavaScript dosyaları tarayıcı uyumluluğu için Babel'dan geçirilir
        - SCSS dosyalarına sıkıştırma işlemi uygulanmaz.
        - SCSS dosyaları tarayıcı uyumluluğu için Prefixer'dan geçirilir.

    b) Ürün ortamı

        - JavaScript dosyaları için otomatik olarak map dosyaları kaldırılır.
        - JavaScript dosyalarına sıkıştırma işlemi uygulanır.
        - JavaScript için tüm console kodları kaldırılır.
        - JavaScript dosyaları tarayıcı uyumluluğu için Babel'dan geçirilir
        - SCSS dosyalarına sıkıştırma işlemi uygulanır. 
        - SCSS dosyaları tarayıcı uyumluluğu için Prefixer'dan geçirilir.
## Projeyi Kullanmaya başlamak için

### Node Sürümü: V18.14.1

**Uygulamanın başarıyla çalışabilmesi için node verisyonunuzu yukarda belirtilen versiyon ile kullanmalısınız.** 

Bu projeyi klonlayın

```bash
  git clone https://github.com/halikali/gulp-arch.git
```

Projeyi terminalde açın

```bash
  cd gulp-arch
```


Bağımlılıklarını indirin

```bash
  npm install
```

## yada 

Terminal aracılığıyla 
```bash
  npx create-gulp-arch <uygulama_ismi>
```
komutuyla beraber kurulumu otomatik olarak yapabilirsiniz. **Bu yöntemde bağımlılıklar otomatik indirilecektir.**

## Dosyalama Sistemi Hakkında
- assets 

    Bu klasörde sayfa için kullanılacak görsel vb. içerikler yer alır. Derleme esnasında boyutları küçültülür ve optimize edilir. 

- components

    Sayfada kullanılacak olan componentler bu klasör altında yer alır. Her bir component için bir dosya açılır ve içerisinde TypeScript ve SCSS dosyaları yer alır. 

    Her klasörde options.json adlı bir dosya bulunur ve aşağıdaki şekilde yapılandırılır:
    ```json
    {
       "exportable": false
    }
    ```

    Bu değer `true` olursa component `dist/components` klasörü altına ayrıca çıkartılır, `false` olursa `dist` klasörü altında derleme işlemi gerçekleşmez.

- fonts

    Custom font dosyaları kullanılacaksa bu klasör altında kullanılabilir.


- scripts

    TypeScript dosyaları bu klasör altında yer alır. Bir klasör altında `index.ts` ve `depends.json` dosyaları yer almadığı sürece dosyalar harici olarak derlenmez. Yalnızca diğer dosyalarla birleştirerek kullanılabilir. Sayfalara ait dosyalar `pages` klasörü altında yer almalıdır. Klasör içerisinde istenildiği kadar `.ts` uzantılı dosya oluşturulabilir yalnızca `index.ts` dosyası derlenecektir.

    depends.json dosyası aşağıdaki gibi yapılandırılır:
    ```json
    {
        "components": [
            "./src/scripts/utils/example-util.ts"
        ]
    }
    ```
    Burada components key'i altındaki dizide belirtilen dosyalar klasördeki `index.ts` dosyası ile birleştirilerek derlenir. 
    
    **Birleştirilecek dosyaların yolu belirtilirken kök dizinden itibaren belirtilmelidir.**

- styles

    Uygulamada kullanılacak stil dosyaları burada yer alır. Tüm stil dosyaları istenilen klasör yapısında kullanılabilir ancak sadece `_` ile başlamayan `.scss` uzantılı dosyalar derlenecektir. 
    Örneğin `_base.scss` dosyası derlenmezken `base.scss` dosyası derlenecektir. Derlenen stil dosyaları tarayıcı uyumlulukları için prefixer'dan geçirilerek derlenir.

- vendors

    Uygulamada kullanılacak 3.parti paketlerin minify edilmiş dosyaları burada yer alır. Derleme esnasında bu klasör herhangi bir derleme işleminden geçirilmeyecek klasör yapısı korunacak şekilde dist altına taşınacaktır.

- views

    HTML dosyaları bu klasör altında yer alır. Tarayıda `http://localhost:64208/views/` altında yayınlanır ancak index.html dosyası ekstra olarak  `http://localhost:64208/` altında da yayınlanacaktır.  
## Kullanabileceğiniz Komutlar

#### Proje içerisinde kullanabileceğiniz gulp komutları ve çalışma mantığı aşağıda açıklanmıştır.

- `gulp`

    Standart Gulp komutudur. Yalnızca TypeScript ve SCSS dosyalarını derler.


- `gulp --only <klasör_adı>`

    Yalnızca belirtilen klasör için TypeScript ve SCSS dosyalarını derler.
    Örneğin `gulp --only homepage ` komutu girildiğinde ` src/scripts/pages/homepage/index.ts` ve `src/styles/pages/homepage/homepage.scss` dosyası derlenir.

    **Bu derleme işlemi TypeScript için yalnızca `index.ts` dosyalarını, SCSS için ise dosya adı `_` ile başlamayan tüm `.scss` uzantılı dosyalar için geçerli olacak şekilde çalışır.**

- `gulp build`

    Tüm dosyalar derlenir ancak değişiklik durumları yansımaz. Tek seferlik derleyip duran bir komuttur.

- `gulp dev`

    Tüm dosyalar derlenir ve dosyalardaki değişiklikler algılanarak değişiklik olan dosyalar için ilgili task'lar otomatik olarak çalışır.

- `npm run build:dev`

    Tüm dosyalar derlenir ancak derlenirken `.env.dev` env dosyası çalışacak şekilde derlenir. Derleme işlemi bittikten sonra dosyaları takip etmez, tek seferlik çalışır ve durur.

    
- `npm run build:prod`

    Tüm dosyalar derlenir ancak derlenirken `.env.prod` env dosyası çalışacak şekilde derlenir. Derleme işlemi bittikten sonra dosyaları takip etmez, tek seferlik çalışır ve durur.

  ![myImage](https://media.giphy.com/media/3o6UBipuQxa6QwnvC8/giphy.gif)
