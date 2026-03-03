FROM nginx:latest

#borrar la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/Productos_web_S1C5/browser /usr/share/nginx/html

EXPOSE 80