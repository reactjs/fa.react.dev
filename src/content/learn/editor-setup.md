---
title: تنظیم اولیه ویرایشگر
---

<Intro>

اگر یک ویرایشگر متن به درستی پیکربندی شده باشد، می‌تواند باعث تمیزتر خوانده شدن کد و سریع‌تر نوشته شدن آن شود. حتی می‌تواند به شما در پیدا کردن خطاهایی که خودتان باعث شده‌اید کمک کند! اگر دفعه‌ی اول است که راه‌اندازی ویراشگر انجام می‌دهید یا قصد تنظیم کردن آنرا دارید، ما چند توصیه داریم:

</Intro>

<YouWillLearn>

* محبوب ترین ویرایشگرها کدام است
* چطور به صورت خودکار کد خودتان را قالب‌بندی کنید

</YouWillLearn>

## ویرایشگر شما {/*your-editor*/}

امروزه [VS Code](https://code.visualstudio.com/) یکی از محبوب‌ترین ویرایشگرهای مورد استفاده است. بازار بزرگی از افزونه‌ها دارد و به خوبی با سرویس های محبوبی مثل Github ادغام میشود. بسیاری از قابلیت های لیست شده‌ی ذیل می‌توانند به عنوان افزونه به VS Code اضافه شوند و آن را بسیار قابل تنظیم کند.

ویرایشگرهای محبوب دیگری که در جامعه‌ی ری‌اکت استفاده می‌شوند شامل:

* [WebStorm](https://www.jetbrains.com/webstorm/) یک محیط توسعه‌ی یکپارچه که مخصوص جاوااسکریپت طراحی شده است.
* [Sublime Text](https://www.sublimetext.com/) از JSX و تایپ‌اسکریپت پشتیبانی میکند، دارای [برجسته‌ساز syntax](https://stackoverflow.com/a/70960574/458193) و تکمیل خودکار داخلی است.
* [Vim](https://www.vim.org/) یک ویرایشگر متن با قابلیت تنظیم بالا است که به منظور ایجاد و تغییر هر نوع متن، بسیار کارآمد ساخته شده است. در اکثر سیستم‌های یونیکس و با Apple OS X به‌عنوان «vi» گنجانده شده‌است.

## قابلیت های پیشنهادی برای ویرایشگر متن {/*recommended-text-editor-features*/}

بعضی ویرایشگرها به صورت داخلی این قابلیت ها را دارند، اما بعضی دیگر نیاز به اضافه کردن افزونه هستند. بررسی کنید تا ببینید ویرایشگر انتخابی شما چه پشتیبانی ارائه می‌دهد تا مطمئن شوید!

### Linting {/*linting*/}

بی شک linter های کد به شما در پیدا کردن خطاهایی که در کد ایجاد کرده‌اید و برطرف کردن آن‌ها کمک میکنند. [ESLint](https://eslint.org/) یک linter متن باز و محبوب برای جاوااسکریپت است.

* [ESLint را با پیکربندی پیشنهادی برای ری‌اکت نصب کنید](https://www.npmjs.com/package/eslint-config-react-app) (مطمعن شوید که [Node نصب است!](https://nodejs.org/en/download/current/))
* [ESLint را با افزونه‌ی رسمی به VSCode اضافه کنید](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

**از فعال بودن تمام قوانین [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) در پروژه‌ی خود اطمینان حاصل کنید.** این قوانین ضروری بوده و از اکثر خطاهای بزرگ جلوگیری میکند. تنظیمات پیشنهادی [`eslint-config-react-app`](https://www.npmjs.com/package/eslint-config-react-app) از پیش تعیین شده و شامل آنها می شود.

### قالب‌بندی {/*formatting*/}

<<<<<<< HEAD
آخرین کاری که می‌خواهید هنگام اشتراک‌گذاری کد خود با مشارکت‌کننده دیگری انجام دهید، وارد شدن به بحث در مورد [tab‌ها در مقابل space‌ها](https://www.google.com/search?q=tabs+vs+spaces) است! خوشبختانه، [Prettier](https://prettier.io/) کد شما را با فرمت مجدد آن برای مطابقت با قوانین از پیش تعیین شده و قابل تنظیم، تمیز می کند. Prettier را اجرا کنید، و همه tab های شما به space تبدیل می‌شوند - و تورفتگی، نقل قول‌ها و غیره نیز برای مطابقت با پیکربندی تغییر می‌کنند. در تنظیمات ایده‌آل، وقتی فایل خود را ذخیره می‌کنید، Prettier اجرا می‌شود و به سرعت این ویرایش‌ها را برای شما انجام می‌دهد.
=======
The last thing you want to do when sharing your code with another contributor is get into a discussion about [tabs vs spaces](https://www.google.com/search?q=tabs+vs+spaces)! Fortunately, [Prettier](https://prettier.io/) will clean up your code by reformatting it to conform to preset, configurable rules. Run Prettier, and all your tabs will be converted to spaces—and your indentation, quotes, etc will also all be changed to conform to the configuration. In the ideal setup, Prettier will run when you save your file, quickly making these edits for you.
>>>>>>> eb174dd932613fb0784a78ee2d9360554538cc08

شما می‌توانید با دنبال کردن مراحل ذیل [افزونه‌ی Prettier را در VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) نصب کنید.

1. اجرای VSCode
2. استفاده از کلیدهای ترکیبی (Ctrl/Cmd+P)
3. چسباندن عبارت `ext install esbenp.prettier-vscode`
4. زدن کلید Enter

#### قالب‌بندی هنگام ذخیره‌سازی {/*formatting-on-save*/}

در حالت ایده آل، باید کد خود را در هر ذخیره‌سازی قالب‌بندی کنید. VS Code تنظیماتی برای این کار دارد!

1. استفاده از کلیدهای ترکیبی `CTRL/CMD + SHIFT + P` داخل VSCode.
2. بنویسید "settings"
3. کلید Enter را بزنید
4. در نوار جستجو، "format on save" را بنویسید
5. مطمعن شوید قابلیت "format on save" تیک خورده باشد!

> اگر ESLint شما دارای قوانین قالب‌بندی از پیش تنظیم شده باشد، ممکن است با Prettier در تضاد باشند. توصیه می‌کنیم با استفاده از [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) تمام قوانین قالب‌بندی  از پیش تنظیم شده را در ESLint غیرفعال کنید. بنابراین ESLint *فقط* برای پیدا کردن خطاهای منطقی استفاده می‌شود.  اگر می‌خواهید قالب‌بندی فایل‌ها را قبل از ادغام درخواست pull انجام دهید، از [`prettier --check`](https://prettier.io/docs/en/cli.html#--check) برای یکپارچه‌سازی مداوم خود استفاده کنید.
