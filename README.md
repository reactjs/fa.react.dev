<<<<<<< HEAD
<h1 dir="rtl">نسخه فارسی <a href="https://reactjs.org/">reactjs.org</a></h1>

<p dir="rtl">
اگر این صفحه را مشاهده می‌کنید، احتمالا به ترجمه فارسی اسناد ری‌اکت (react) علاقه‌مند هستید. پس خوش‌ آمدید!
</p>

<p dir="rtl">
این مخزن کد (repo) با هدف توسعه اسناد ری‌اکت به زبان فارسی، از <a href="https://github.com/reactjs/reactjs.org">reactjs/reactjs.org</a> انشعاب (fork) گرفته‌است و پیوسته با نسخه اصلی همگام‌سازی می‌شود.
</p>

<p dir="rtl">
پیشرفت نسخه فارسی را از <a href="https://www.isreacttranslatedyet.com/">isreacttranslatedyet.com</a> دنبال کنید.
</p>

<p dir="rtl">
  آخرین نسخه اسنادی که درحال ترجمه هستند را در <a href="https://reactjs-fa.netlify.com/" target="_blank">reactjs-fa.netlify.com</a> ببینید.
</p>

<h2 dir="rtl">چگونه مشارکت کنم؟</h2>

<p dir="rtl">
پیشنهاد می‌شود به‌ترتیب از لینک‌های زیر شروع کنید:
</p>
<ul dir="rtl">
  <li>
    <a href="https://github.com/reactjs/fa.reactjs.org/blob/master/CONTRIBUTING.md">
      راهنمای مشارکت‌کنندگان
    </a>
  </li>
  <li>
    <a href="https://github.com/reactjs/fa.reactjs.org/blob/master/STYLE-GUIDE.md">
      شیوه نگارش
    </a>
  </li>
  <li>
    <a href="https://github.com/reactjs/fa.reactjs.org/blob/master/TRANSLATION.md">
      واژه‌نامه
    </a>
  </li>
</ul>

<h2 dir="rtl">
دریافت کد
</h2>

<h3 dir="rtl">
پیش‌نیازها
</h3>

<ul dir="rtl">
  <li>
    <a href="https://git-scm.com/downloads">Git</a>
  </li>
  <li>
    <a href="https://nodejs.org/en/">Node.js</a> نسخه ۸ (۸.۴.۰ به بالا)
  </li>
    <li>
    <a href="https://yarnpkg.com/lang/en/docs/install/">Yarn</a>
  </li>
</ul>

<h3 dir="rtl">نصب</h3>

```bash
# ۱. یک کپی از مخزن کد بگیرید
git clone https://github.com/reactjs/fa.reactjs.org.git

# ۲. به شاخه اصلی پروژه بروید
cd fa.reactjs.org

# ۳. وابستگی‌های npm پروژه را نصب کنید
yarn
```

<h3 dir="rtl">اجرا</h3>

```bash
# سرور توسعه با قابلیت بارگذاری خودکار را اجرا کنید (قدرت گرفته از Gatsby)
yarn dev
```

<p dir="rtl">
حالا آدرس <a href="http://localhost:8000">http://localhost:8000</a> را در مرورگر دلخواه خود باز کنید و تمام!
</p>

<h3 dir="rtl">سوالی دارید؟</h3>

‌<p dir="rtl">
اگر سوالی دارید با نگاه‌دارندگان تماس بگیرید یا <a href="https://github.com/reactjs/fa.reactjs.org/issues/new">یک موضوع (issue) جدید</a> ثبت کنید!
</p>

<h2 dir="rtl">نگاه‌دارندگان</h2>

<ul>
  <li>
    <a href="https://github.com/masoud-bahrami">@masoud-bahrami</a>
  </li>
  </li>
    <li>
    <a href="https://github.com/Schabaani">@Schabaani</a>
  </li>
  </li>
    <li>
    <a href="https://github.com/sJJdGG">@sJJdGG</a>
  </li>
  <li>
    <a href="https://github.com/sorousht">@sorousht</a>
  </li>
    <li>
    <a href="https://github.com/zahrajoulaei">@zahrajoulaei</a>
  </li>
   <li>
    <a href="https://github.com/seven-deuce">@seven-deuce</a>
  </li>
  <li>
    <a href="https://github.com/rezvani2647">@rezvani2647</a>
  </li>
</ul>


<h2 dir="rtl">مجوز</h2>

<p dir="rtl">
محتوایی که در <a href="https://reactjs.org/">reactjs.org</a> قرار می‌گیرد، تخت مجوز CC-BY-4.0 منتشر می‌شود که جزئیات آن در <a href="https://github.com/open-source-explorer/reactjs.org/blob/master/LICENSE-DOCS.md">LICENSE-DOCS.md</a> آمده‌است.
</p>
=======
# reactjs.org

This repo contains the source code and documentation powering [reactjs.org](https://reactjs.org/).

## Getting started

### Prerequisites

1. Git
1. Node: any 8.x version starting with 8.4.0 or greater
1. Yarn: See [Yarn website for installation instructions](https://yarnpkg.com/lang/en/docs/install/)
1. A fork of the repo (for any contributions)
1. A clone of the [reactjs.org repo](https://github.com/reactjs/reactjs.org) on your local machine

### Installation

1. `cd reactjs.org` to go into the project root
1. `yarn` to install the website's npm dependencies

### Running locally

1. `yarn dev` to start the hot-reloading development server (powered by [Gatsby](https://www.gatsbyjs.org))
1. `open http://localhost:8000` to open the site in your favorite browser

## Contributing

### Guidelines

The documentation is divided into several sections with a different tone and purpose. If you plan to write more than a few sentences, you might find it helpful to get familiar with the [contributing guidelines](https://github.com/reactjs/reactjs.org/blob/master/CONTRIBUTING.md#guidelines-for-text) for the appropriate sections.

### Create a branch

1. `git checkout master` from any folder in your local `reactjs.org` repository
1. `git pull origin master` to ensure you have the latest main code
1. `git checkout -b the-name-of-my-branch` (replacing `the-name-of-my-branch` with a suitable name) to create a branch

### Make the change

1. Follow the ["Running locally"](#running-locally) instructions
1. Save the files and check in the browser
  1. Changes to React components in `src` will hot-reload
  1. Changes to markdown files in `content` will hot-reload
  1. If working with plugins, you may need to remove the `.cache` directory and restart the server

### Test the change

1. If possible, test any visual changes in all latest versions of common browsers, on both desktop and mobile.
1. Run `yarn check-all` from the project root. (This will run Prettier, ESLint, and Flow.)

### Push it

1. `git add -A && git commit -m "My message"` (replacing `My message` with a commit message, such as `Fix header logo on Android`) to stage and commit your changes
1. `git push my-fork-name the-name-of-my-branch`
1. Go to the [reactjs.org repo](https://github.com/reactjs/reactjs.org) and you should see recently pushed branches.
1. Follow GitHub's instructions.
1. If possible, include screenshots of visual changes. A Netlify build will also be automatically created once you make your PR so other people can see your change.

## Translation

If you are interested in translating `reactjs.org`, please see the current translation efforts at [isreacttranslatedyet.com](https://www.isreacttranslatedyet.com/).


If your language does not have a translation and you would like to create one, please follow the instructions at [reactjs.org Translations](https://github.com/reactjs/reactjs.org-translation#translating-reactjsorg).

## Troubleshooting

- `yarn reset` to clear the local cache

## License
Content submitted to [reactjs.org](https://reactjs.org/) is CC-BY-4.0 licensed, as found in the [LICENSE-DOCS.md](https://github.com/open-source-explorer/reactjs.org/blob/master/LICENSE-DOCS.md) file.
>>>>>>> 2ef0ee1e4fc4ce620dce1f3e0530471195dc64d1
