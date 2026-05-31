import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentDTO } from '../../models/appointmentDTO';
import { AppointmentService } from '../../services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusEnum } from '../../Enums/Status.enum';
import { Veterinarian } from '../../models/veterinarian';
import { VeterinarianService } from '../../services/veterinarian.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent implements OnInit{

  isEditing: boolean = false;
  errorMessage: string = '';
  veterinarians: Veterinarian[] = [];

  appointmentDTO : AppointmentDTO = {
    vetId: 0,
    dateTime: '',
    status: 0
  }

  Status = Object.values(StatusEnum).filter(value => typeof value === 'string');
  selectedStatus: StatusEnum = 0;

  constructor(private veterinarianService: VeterinarianService ,private appointmentService: AppointmentService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.loadVeterinarians();
    this.route.paramMap.subscribe((result) => {
      const id = result.get("id");
      if(id)
      {
        this.isEditing = true;
        this.appointmentService.getAppointmentById(+id).subscribe({
          next: (response) => {
            this.appointmentDTO = {
              vetId: response.vetId,
              dateTime: response.dateTime,
              status: response.status
            }
          },
          error: (error) => {
            this.errorMessage = 'Error fetching appointment details. Please try again.';
            console.error('Error fetching appointment details:', error);
          }
        })

      }else{
        this.isEditing = false;
      }
    })
  }

  loadVeterinarians(): void {
    this.veterinarianService.getVeterinarians().subscribe({
      next: (data : Veterinarian[]) => {
        this.veterinarians = data;
      },
      error: () => {
        this.errorMessage = 'Error loading veterinarians';
      }
    });
  }

  onSubmit(): void
  {
    if(this.isEditing)
    {
      const id = this.route.snapshot.paramMap.get('id');
      if(id)
      {
        this.appointmentService.updateAppointment(+id,this.appointmentDTO).subscribe({
          next: (response) => {
            this.router.navigate(['/appointments']);
          },
          error: (error) => {
            this.errorMessage = "Error updating appointment.Please try again.";
            console.error('Error updating appointment:', error);
          }
        })
      }
    }else{
      const timeForm = this.appointmentDTO.dateTime;
      const date = new Date(timeForm);
      date.setHours(date.getHours()+2)
      this.appointmentDTO.dateTime = date.toISOString();

      this.appointmentService.createAppointment(this.appointmentDTO).subscribe({
        next: (response) => {
          this.router.navigate(['/appointments']);
        },
        error: (error) => {
          this.errorMessage = "Error creating appointment.Please try again.";
          console.error('Error creating appointment:', error);
        }
      })
    }
  }

}
