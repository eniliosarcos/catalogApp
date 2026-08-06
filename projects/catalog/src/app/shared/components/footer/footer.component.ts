import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactService } from '@shared/services/contact.service';
import { ContactConfig } from '@shared/models/environment.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private contactService = inject(ContactService);

  currentYear = new Date().getFullYear();
  contact: ContactConfig | null = null;

  ngOnInit(): void {
    this.contactService.getContact().subscribe(config => {
      this.contact = config;
    });
  }
}
