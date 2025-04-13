import * as path from 'path';

import * as express from 'express';
import * as nunjucks from 'nunjucks';

export class Nunjucks {
  constructor(public developmentMode: boolean) {
    this.developmentMode = developmentMode;
  }

  enableFor(app: express.Express): void {
    app.set('view engine', 'njk');
    const env = nunjucks.configure(path.join(__dirname, '..', '..', 'views'), {
      autoescape: true,
      watch: this.developmentMode,
      express: app,
    });
  
    // Add date filter
    env.addFilter('date', (date: string, format: string) => {
      if (!date) return '';
      
      try {
        const dateObj = new Date(date);
        
        // Format: DD/MM/YYYY HH:mm
        if (format === 'DD/MM/YYYY HH:mm') {
          const day = String(dateObj.getDate()).padStart(2, '0');
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const year = dateObj.getFullYear();
          const hours = String(dateObj.getHours()).padStart(2, '0');
          const minutes = String(dateObj.getMinutes()).padStart(2, '0');
          
          return `${day}/${month}/${year} ${hours}:${minutes}`;
        }
        
        return date;
      } catch (error) {
        return date;
      }
    });
  
    app.use((req, res, next) => {
      res.locals.pagePath = req.path;
      next();
    });
  }
}
