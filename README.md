# Elcentral-appen

Webbapp för att styra och övervaka elcentralen (ESP32-S3) via Bluetooth Low Energy.

- **Öppna:** sidan på GitHub Pages i Chrome på Android. Tryck *Anslut* och välj `Elcentral-XXXX`.
- **Utan kort:** appen kör mot en inbyggd simulator när ingen central är ansluten.
- **Hemskärmen:** Chrome-menyn → *Lägg till på startskärmen* (eller *Installera app*).

Web Bluetooth kräver https och fungerar i Chrome på Android och på dator, inte i Safari på iPhone.

Hela appen är en fil, `index.html`. Bluetooth-protokollet finns beskrivet i
`ble-protokoll.md` i projektet för centralen.
