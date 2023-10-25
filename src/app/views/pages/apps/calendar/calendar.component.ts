import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  FullCalendarComponent,
} from '@fullcalendar/angular';
import { Draggable } from '@fullcalendar/interaction'; // for dateClick
import { dataTest } from 'src/app/shared/components/app-question/questions/2-INTRALABORAL-B';
import { LoadingService } from 'src/app/shared/services/loading.service';
let eventGuid = 0;
export function createEventId() {
  return String(eventGuid++);
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('externalEvents', { static: true }) externalEvents: ElementRef;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  events = [];
  public opciones: any = [];

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'timeGridWeek',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    hiddenDays: [0],
    events: this.events,
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    // For external-events dragging
    new Draggable(this.externalEvents.nativeElement, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText,
          backgroundColor: eventEl.getAttribute('bgColor'),
          borderColor: eventEl.getAttribute('bdColor'),
        };
      },
    });
    this.loadingService.ChangeStatusLoading(false);
    this.opciones = dataTest;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const fechaInicio = new Date(selectInfo.startStr);
    const fechaFin = new Date(selectInfo.endStr);
    const title = prompt('Titulo de evento');
    const repeat = confirm('Repetir el evento');
    const calendarApi = selectInfo.view.calendar;
    const daysOfWeek = repeat && {
      daysOfWeek: [fechaInicio.getDay()],
      startTime: `${fechaInicio.getHours()}:${fechaInicio.getMinutes()}:${fechaInicio.getSeconds()}`,
      endTime: `${fechaFin.getHours()}:${fechaFin.getMinutes()}:${fechaFin.getSeconds()}`,
    };
    console.log(selectInfo);
    console.log(repeat);

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        title: title,
        backgroundColor:
          fechaInicio.getHours() > 5 && fechaInicio.getHours() < 18
            ? 'rgba(253,126,20,.25)'
            : 'rgba(241, 0, 117, 0.25)',
        borderColor:
          fechaInicio.getHours() > 5 && fechaInicio.getHours() < 18
            ? '#fd7e14'
            : '#f10075',
        ...daysOfWeek,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  alertconfirmonfirm() {
    let text = 'Press a button!\nEither OK or Cancel.';
    if (confirm(text) == true) {
      text = 'You pressed OK!';
    } else {
      text = 'You canceled!';
    }
  }
}
