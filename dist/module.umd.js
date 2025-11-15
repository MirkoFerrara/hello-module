(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/common/http'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/common/http', '@angular/router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.HelloModule = {}, global.ng.core, global.ng.common, global.ng.common.http, global.ng.router));
})(this, (function (exports, core, common, http, router) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    exports.HelloModuleComponent = class HelloModuleComponent {
        http;
        message = 'Benvenuto nel modulo Hello! 🎉';
        backendResponse = '';
        loading = false;
        constructor(http) {
            this.http = http;
        }
        ngOnInit() {
            console.log('✅ Hello Module caricato con successo!');
        }
        loadFromBackend() {
            this.loading = true;
            this.http.get('/api/modules/hello-module/message')
                .subscribe({
                next: (response) => {
                    this.backendResponse = response.message;
                    this.loading = false;
                },
                error: (error) => {
                    this.backendResponse = '❌ Errore nel caricamento dal backend';
                    this.loading = false;
                    console.error('Errore:', error);
                }
            });
        }
    };
    exports.HelloModuleComponent = __decorate([
        core.Component({
            selector: 'app-hello-module',
            template: `
    <div class="module-container">
      <h1>👋 Hello Module</h1>
      
      <div class="message">
        {{ message }}
      </div>
      
      <p>Questo è un modulo di esempio che dimostra:</p>
      <ul style="list-style: none; padding: 0; margin: 20px 0;">
        <li>✅ Caricamento dinamico del frontend</li>
        <li>✅ Comunicazione con backend del modulo</li>
        <li>✅ Stili isolati del componente</li>
        <li>✅ Integrazione con l'app principale</li>
      </ul>
      
      <button (click)="loadFromBackend()" [disabled]="loading">
        {{ loading ? 'Caricamento...' : '📡 Carica dal Backend' }}
      </button>
      
      <div class="backend-response" *ngIf="backendResponse">
        <strong>Risposta dal backend:</strong><br>
        {{ backendResponse }}
      </div>
    </div>
  `,
            styles: [`
    .module-container {
      padding: 40px;
      text-align: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      min-height: 400px;
    }
    
    h1 {
      font-size: 3em;
      margin-bottom: 20px;
      animation: fadeIn 1s ease-in;
    }
    
    .message {
      font-size: 1.5em;
      margin: 20px 0;
      padding: 20px;
      background: rgba(255,255,255,0.2);
      border-radius: 8px;
    }
    
    .backend-response {
      margin-top: 30px;
      padding: 20px;
      background: rgba(255,255,255,0.1);
      border-radius: 8px;
      font-style: italic;
    }
    
    button {
      margin-top: 20px;
      padding: 12px 30px;
      font-size: 1.1em;
      background: white;
      color: #667eea;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      transition: transform 0.2s;
      font-weight: bold;
    }
    
    button:hover {
      transform: scale(1.05);
    }
    
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
        }),
        __metadata("design:paramtypes", [http.HttpClient])
    ], exports.HelloModuleComponent);

    const routes = [
        { path: '', component: exports.HelloModuleComponent }
    ];
    exports.HelloModule = class HelloModule {
    };
    exports.HelloModule = __decorate([
        core.NgModule({
            declarations: [
                exports.HelloModuleComponent
            ],
            imports: [
                common.CommonModule,
                http.HttpClientModule,
                router.RouterModule.forChild(routes)
            ]
        })
    ], exports.HelloModule);

}));
//# sourceMappingURL=module.umd.js.map
