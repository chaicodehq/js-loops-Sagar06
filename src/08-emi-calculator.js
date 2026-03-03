/**
 * 📱 Rohit ka Phone EMI Calculator
 *
 * Rohit ne naya phone liya hai EMI pe! Usse jaanna hai ki kitne months
 * lagenge phone ka poora paisa chukane mein. Har month interest lagta hai
 * remaining amount pe, aur phir EMI deduct hoti hai.
 *
 * Rules (use while loop):
 *   - Start with principal amount (remaining balance)
 *   - Each month:
 *     1. Calculate interest = remaining * monthlyRate (monthlyRate is like 0.02 for 2%)
 *     2. Add interest to remaining: remaining = remaining + interest
 *     3. Deduct EMI: remaining = remaining - emi
 *     4. Increment months count
 *     5. Add emi to totalPaid
 *   - Continue while remaining > 0
 *   - In the last month, if remaining < emi, just pay what's left
 *     (totalPaid += remaining before deduction, not full emi)
 *
 * Infinite loop protection:
 *   - Agar EMI <= first month's interest (principal * monthlyRate),
 *     toh loan kabhi khatam nahi hoga!
 *     Return: { months: -1, totalPaid: -1, totalInterest: -1 }
 *
 * Validation:
 *   - All three params must be positive numbers, else return
 *     { months: -1, totalPaid: -1, totalInterest: -1 }
 *
 * @param {number} principal - Loan amount (phone ki price)
 * @param {number} monthlyRate - Monthly interest rate (e.g., 0.02 for 2%)
 * @param {number} emi - Monthly EMI amount
 * @returns {{ months: number, totalPaid: number, totalInterest: number }}
 *
 * @example
 *   calculateEMI(10000, 0.01, 2000)
 *   // Month 1: 10000 + 100 = 10100, pay 2000, remaining = 8100
 *   // Month 2: 8100 + 81 = 8181, pay 2000, remaining = 6181
 *   // ... continues until remaining <= 0
 *
 *   calculateEMI(10000, 0.05, 400)
 *   // First month interest = 500, EMI = 400 < 500, INFINITE LOOP!
 *   // => { months: -1, totalPaid: -1, totalInterest: -1 }
 */
export function calculateEMI(principal, monthlyRate, emi) {
  // Input validation
  // if (typeof principal !== 'number' || typeof monthlyRate !== 'number' || typeof emi !== 'number' ||
  //     principal <= 0 || monthlyRate <= 0 || emi <= 0 || !Number.isFinite(principal) || !Number.isFinite(monthlyRate) || !Number.isFinite(emi)) {
  //   return { months: -1, totalPaid: -1, totalInterest: -1 }; // Invalid input
  // }

  // // Infinite loop protection: Check if EMI is less than or equal to first month's interest
  // const firstMonthInterest = principal * monthlyRate;
  // if (emi <= firstMonthInterest) {
  //   return { months: -1, totalPaid: -1, totalInterest: -1 }; // Infinite loop scenario
  // }

  // let remaining = principal;
  // let months = 0;
  // let totalPaid = 0;
  // let totalInterest = 0;

  // while (remaining > 0) {
  //   const interest = remaining * monthlyRate; // Calculate interest for the month
  //   totalInterest += interest; // Accumulate total interest
  //   remaining += interest; // Add interest to remaining balance

  //   if (remaining < emi) {
  //     totalPaid += remaining; // Pay only what's left if it's less than EMI
  //     remaining = 0; // Loan is fully paid
  //   } else {
  //     totalPaid += emi; // Pay full EMI
  //     remaining -= emi; // Deduct EMI from remaining balance
  //   }

  //   months += 1; // Increment month count
  // }

  // return { months, totalPaid, totalInterest }; // Return the result
  // Return the result
  /**
   * EMI Calculator with Interest and Principal tracking
   */
 {
    // 1. Validation: Sab numbers positive hone chahiye
   if (typeof principal !== 'number' || typeof monthlyRate !== 'number' || typeof emi !== 'number' ||
    principal <= 0 || monthlyRate <= 0 || emi <= 0 || !Number.isFinite(principal) || !Number.isFinite(monthlyRate) || !Number.isFinite(emi)) {
   return { months: -1, totalPaid: -1, totalInterest: -1 }; // Invalid input
 }

    // 2. Infinite Loop Protection:
    // Agar pehle mahine ka interest hi EMI se zyada hai, loan kabhi khatam nahi hoga.
    if (emi <= principal * monthlyRate) {
      return { months: -1, totalPaid: -1, totalInterest: -1 };
    }

    let remaining = principal;
    let months = 0;
    let totalInterest = 0;
    let totalPaid = 0;

    // 3. While Loop: Jab tak loan bacha hai
    while (remaining > 0) {
      // A. Interest calculate karo aur total mein add karo
      let interestForThisMonth = remaining * monthlyRate;
      totalInterest += interestForThisMonth;

      // B. Balance mein interest add karo
      remaining += interestForThisMonth;
      months++;

      // C. Last Month logic:
      // Agar remaining balance EMI se kam hai, toh sirf bacha hua balance pay karo
      if (remaining < emi) {
        totalPaid += remaining;
        remaining = 0; // Loan khatam!
      } else {
        // Regular EMI payment
        totalPaid += emi;
        remaining -= emi;
      }
    }

    return {
      months: months,
      totalPaid: Number(totalPaid.toFixed(2)), // Optional: Rounding for clean decimals
      totalInterest: Number(totalInterest.toFixed(2)),
    };
  }
}
