# 🔐 Math Battle - Daily Access Code & Gmail Setup Guide

Yeh system Math Battle website ko har din ek naye random 6-digit access code se protect karta hai.

---

### ⚙️ Kaise Kaam Karta Hai (Features):
1. **Daily Code:** Har din ek random 6-digit code generate hota hai.
2. **Same Code for Whole Day:** Agar ek hi din me 10 baar bhi "Send Code" dabaya jaye, toh code change nahi hoga, wahi same code email par aayega.
3. **24-Hour Expiry:** Agle din (24 ghante baad) code automatically change ho jayega aur purana code expire ho jayega.
4. **Instant Unlock:** Jo bhi banda us din ka valid code enter karega, uske browser me 24 ghante ke liye access unlock ho jayega.
5. **Direct to Gmail:** "Send Code" dabate hi code aapke personal Gmail inbox me deliver ho jayega.

---

### 🚀 2-Minute Google Apps Script Setup (100% Free)

#### Step 1: Google Apps Script Kholein
1. Apne browser me **[https://script.google.com/](https://script.google.com/)** open karein (apne personal Gmail se login karein).
2. Top-left me **"+ New project"** par click karein.
3. Project ka naam upar change karke **"Math Battle Access System"** rakh dein.

#### Step 2: Code Paste Karein
1. Editor me jo pehle se code likha hai (`function myFunction() ...`), use delete kar dein.
2. Is folder me maujood file `google_apps_script.js` ka saara code copy karke wahan paste kar dein.
3. Line number 21 par apna Gmail address daalein:
   ```javascript
   const OWNER_EMAIL = "your_actual_email@gmail.com";
   ```
4. Upar **Save icon (Floppy icon / Ctrl + S)** dabayein.

#### Step 3: Web App ke roop me Deploy Karein
1. Top-right me blue button **"Deploy"** -> **"New deployment"** par click karein.
2. Left side me **Gear icon (⚙️)** dabayein aur **"Web app"** choose karein.
3. Settings set karein:
   - **Description:** `Math Battle API`
   - **Execute as:** `Me (your_email@gmail.com)`
   - **Who has access:** `Anyone`  *(⚠️ Important: Isko "Anyone" hi select karein taaki website verify kar sake)*
4. **"Deploy"** button dabayein.
5. Agar Google permission maange:
   - "Authorize access" dabayein -> apna Google account choose karein.
   - Agar "Google hasn't verified this app" warning aaye, toh **"Advanced"** par click karke **"Go to Math Battle Access System (unsafe)"** dabayein aur **"Allow"** karein. *(Yeh aapka apna banaya hua script hai, isliye 100% safe hai)*.

#### Step 4: URL Copy karke `index.html` me Dalein
1. Deployment ke baad aapko ek **"Web app URL"** milega (jo `https://script.google.com/macros/s/.../exec` jaisa dikhega).
2. Us URL ko copy karein.
3. `index.html` file kholein aur line ~1140 par URL paste kar dein:
   ```javascript
   const GAS_WEBAPP_URL = "https://script.google.com/macros/s/AKfyc.../exec";
   ```
4. Save karein. Bas! Aapka daily Gmail access code system live ho chuka hai! 🎉
