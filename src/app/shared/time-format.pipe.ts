import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: any, format: '24-hour' | '12-hour' = '24-hour'): string {
    if (!Array.isArray(value) || value.length !== 3) {
      return ''; // Return an empty string for invalid input
    }

    const [hours, minutes, seconds] = value.map(Number);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      return ''; // Handle invalid numerical values
    }

    if (format === '12-hour') {
      const period = hours >= 12 ? 'PM' : 'AM';
      const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
      return `${adjustedHours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')} ${period}`;
    }

    // Default to 24-hour format
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
