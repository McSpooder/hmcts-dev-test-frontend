const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');

class Nunjucks {
  constructor(developmentMode) {
    this.developmentMode = developmentMode;
  }

  enableFor(app) {
    app.set('view engine', 'njk');
    const env = nunjucks.configure(path.join(__dirname, '..', '..', 'views'), {
      autoescape: true,
      watch: this.developmentMode,
      express: app,
    });

    // Add date filter with manual padding function
    function pad(str, length) {
      str = String(str);
      while (str.length < length) {
        str = '0' + str;
      }
      return str;
    }

    env.addFilter('date', (date, format) => {
      if (!date) return '';

      try {
        const dateObj = new Date(date);

        // Format: DD/MM/YYYY HH:mm
        if (format === 'DD/MM/YYYY HH:mm') {
          const day = pad(dateObj.getDate(), 2);
          const month = pad(dateObj.getMonth() + 1, 2);
          const year = dateObj.getFullYear();
          const hours = pad(dateObj.getHours(), 2);
          const minutes = pad(dateObj.getMinutes(), 2);

          return `${day}/${month}/${year} ${hours}:${minutes}`;
        }

        // Convert the date to ISO string and remove the 'Z' (UTC) at the end
        const formattedDate = dateObj.toISOString(); // This should give 'YYYY-MM-DDTHH:mm:ss'
        console.log(formattedDate); // Ensure this logs a date like "2025-04-18T17:13:00.000Z"
        return formattedDate;
      } catch (error) {
        console.error('Error formatting date:', error); // Log the error for debugging
        return date; // Return the original date if there's an error
      }
    });

    app.use((req, res, next) => {
      res.locals.pagePath = req.path;
      next();
    });
  }
}

module.exports = { Nunjucks };
