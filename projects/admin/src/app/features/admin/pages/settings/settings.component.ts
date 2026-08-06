import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '@shared/services/contact.service';
import { ContactConfig } from '@shared/models/environment.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private contactService = inject(ContactService);

  whatsapp = signal('');
  whatsappDisplay = signal('');
  instagram = signal('');
  telegram = signal('');
  isLoading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  ngOnInit(): void {
    this.contactService.getContact().subscribe(config => {
      this.whatsapp.set(config.whatsapp);
      this.whatsappDisplay.set(config.whatsappDisplay);
      this.instagram.set(config.instagram);
      this.telegram.set(config.telegram);
    });
  }

  onSubmit(): void {
    this.isLoading.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const config: ContactConfig = {
      whatsapp: this.whatsapp(),
      whatsappDisplay: this.whatsappDisplay(),
      instagram: this.instagram(),
      telegram: this.telegram(),
    };

    this.contactService.updateContact(config).subscribe({
      next: () => {
        this.successMessage.set('Configuración guardada correctamente');
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al guardar la configuración');
        this.isLoading.set(false);
      },
    });
  }
}
