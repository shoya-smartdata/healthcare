function generateTimeSlots(startTime, endTime, intervalInMinutes = 60) {
    const slots = [];
    let currentTime = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
  
    while (currentTime <= end) {
      slots.push(currentTime.toTimeString().slice(0, 5)); // Format as "HH:MM"
      currentTime.setMinutes(currentTime.getMinutes() + intervalInMinutes);
    }
    return slots;
  }
  
  // Example usage:
  const availableSlots = generateTimeSlots('09:00', '17:00');
  