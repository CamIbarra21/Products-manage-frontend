import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { definePreset } from '@primeuix/themes';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Productos_web_S1C5');
  ngOnInit(): void {
    const MyPreset = definePreset(Aura, {
      semantic: {
          primary: {
              50: '{violet.50}',
              100: '{violet.100}',
              200: '{violet.200}',
              300: '{violet.300}',
              400: '{violet.400}',
              500: '{violet.500}',
              600: '{violet.600}',
              700: '{violet.700}',
              800: '{violet.800}',
              900: '{violet.900}',
              950: '{violet.950}'
          }
      },
      components: {
        menu: {
          root: {
            background: 'var(--secondary-mn-color)',
            borderColor: 'none',
            borderRadius: '0'
          },
          item: {
            focusColor: 'var(--secondary-bg-color)',
            icon: {
              focusColor: 'var(--secondary-bg-color)',
            }
          }
        },
        toolbar: {
          root: {
            background: 'none',
            borderRadius: '0'
          }
        },
        drawer: {
          root: {
            background: 'var(--secondary-mn-color)'
          }
        }
      }
    });
    usePreset(MyPreset);
  }
}
