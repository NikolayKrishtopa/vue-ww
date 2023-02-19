# Vue weather widget

This project is the test assignment for the VueJS developer position.

This is the weather widget that can easily integrated into any project as simple as input tag < weather-widget /> and import just a single script for that. The widget shows weather data for locations defined by users with ability of changing them per user's preferences.

## The technical stack used for this project:

- Vanilla JS
- Vue.js framework
- Tailwind CSS
- Webpack with some plugins/libraries if/as required
- Yandex geocoding API for cities query
- Free Open Weather API for fetching weather data.

## This app will require a few simple steps prior to being integrated into your app:

1. Clone the project repository to your local directory.
2. npm i to install all the required dependencies.
3. OPTIONAL: npm run dev if you want to look at the widget before you place that to anywhere else.
4. npm run build
5. in the dist directory you will be able to find the weather-widget directory. You can move that anywhere you want.
6. in the layout of your project place tag < weather-widget /> in any place and import weatherWidget.js from the widget directory.
7. Run your project

## NOTES:

- The widget nominally required 320 pixel of width in your project. You can adjust this behavior by adding scale attribute to the initial weather-widget tag as shown on the reference below:

             <weather-widget scale="0.8" />

- Once scale has not been applied it takes default value "1".
- If the scale applied the widget is aligned with the upper left side comparing to its position with default scale=1. Be noted about that and take it into account when you're working to ajust your layout.
- The widget nominally alligned to be located in the centre of the container it has been placed into (in case the container size exceeds the widget size itself).
- If you use this widget anywhere I would appreciate if you replace my keys for weather and geocoding APIs with yours. Both these APIs are free for use, however, they have a restriction for qty of requests per time which might impact my account. It can be easily configured by revising a couple constants in utils/utils.js config file. TIA.

## Thanks to everyone for paying attention to my repository.
