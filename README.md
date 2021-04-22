A website to demonstrate how CSRF (Cross Site Request Forgery) attacks are launched.

#### [LIVE VERSION](https://attack-launcher.netlify.app/)

---

Snapshots

![csrf-1](https://user-images.githubusercontent.com/66271249/115693641-be11a900-a37d-11eb-85b6-4192e0389613.PNG)
<i>if we try to change the password on the safe website we get Error 401 (Unauthorized) as we have set the sameSite attribute to strict on safe site. On the other hand, when we tried to change password on the unsafe website, it gave a success message and password also changed.</i>

---

![csrf-2](https://user-images.githubusercontent.com/66271249/115693644-beaa3f80-a37d-11eb-8b2b-f821e12ad76a.PNG)
<i>For the safe website, in the attributes of cookies, we can see that the sameSite attribute is set to Strict, which prevents cross origin sharing of cookies and hence prevents CSRF attacks</i>

---

![csrf-3](https://user-images.githubusercontent.com/66271249/115693651-bfdb6c80-a37d-11eb-9ca1-82ade9436359.PNG)
<i>For the unsafe website the sameSite attribute is set to None, which makes it vulnerable to CSRF attacks. Also the HttpOnly attribute is false, which is the reason why we were able to expose cookies/token while demonstrating XSS attack on the unsafe website.</i>
