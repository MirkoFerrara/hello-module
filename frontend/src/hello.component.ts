import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hello-module',
  templateUrl: './hello.component.html',
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
})
export class HelloModuleComponent implements OnInit {
  
  message: string = 'Benvenuto nel modulo Hello! 🎉';
  backendResponse: string = '';
  loading: boolean = false;
  
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    console.log('✅ Hello Module caricato con successo!');
  }
  
  loadFromBackend() {
    this.loading = true;
    
    this.http.get<{message: string}>('/api/modules/hello-module/message')
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
}