import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../models/appointment';
import { Veterinarian } from '../../models/veterinarian';
import { StatusEnum } from '../../Enums/Status.enum';
import { AppointmentService } from '../../services/appointment.service';
import { VeterinarianService } from '../../services/veterinarian.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-appointment-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-table.component.html',
  styleUrl: './appointment-table.component.css'
})
export class AppointmentTableComponent implements OnInit{

  appointments: Appointment[] = [];
  veterinarians: Veterinarian[] = [];

  status = StatusEnum;

  constructor(private appointmentService: AppointmentService, private vetService: VeterinarianService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  getVeterinarianName(vetId: number): string {
    const vet = this.veterinarians.find(v => v.id === vetId);
    return vet ? vet.name : 'Unknown Veterinarian';
  }

  deleteAppointment(id:number): void{
    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        this.appointments = this.appointments.filter(app => app.id !== id);
      },
      error: (err) => {
        console.error('Error deleting appoinment:',err);
      }
    })
  }

  updateAppointment(id:number): void {
    this.router.navigate([`/updateAppointment/${id}`]);
    console.log('Update appointment with ID:', id);
  }

  loadData(): void {
    forkJoin({
      appointments: this.appointmentService.getAllAppointments(),
      veterinarians: this.vetService.getVeterinarians()
    }).subscribe({
      next: (result) => {
        this.appointments = result.appointments;
        this.veterinarians = result.veterinarians;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    })
  }

}
