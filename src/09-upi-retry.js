/**
 * 💸 Bunty ka UPI Payment Retry
 *
 * Bunty apne dost ko paise bhej raha hai UPI se, lekin network thoda
 * flaky hai. Payment kabhi success hota hai, kabhi fail. Bunty ka app
 * automatically retry karta hai with exponential backoff.
 *
 * Rules (use do...while loop):
 *   - outcomes is an array of strings: "success" or "fail"
 *   - ALWAYS attempt at least once (that's why do...while!)
 *   - outcomes[0] is the result of attempt 1, outcomes[1] is attempt 2, etc.
 *   - If the attempt is "success", stop immediately
 *   - If the attempt is "fail", add wait time and try again
 *   - Wait times follow exponential backoff: 1s, 2s, 4s, 8s
 *     (wait time is added AFTER a failed attempt, before next retry)
 *   - Maximum 5 attempts total (if all fail, stop after 5th)
 *   - totalWaitTime = sum of all wait times between attempts
 *
 * Validation:
 *   - Agar outcomes array nahi hai ya empty hai,
 *     return: { attempts: 0, success: false, totalWaitTime: 0 }
 *
 * @param {string[]} outcomes - Array of "success" or "fail" for each attempt
 * @returns {{ attempts: number, success: boolean, totalWaitTime: number }}
 *
 * @example
 *   upiRetry(["fail", "fail", "success"])
 *   // Attempt 1: fail, wait 1s
 *   // Attempt 2: fail, wait 2s
 *   // Attempt 3: success!
 *   // => { attempts: 3, success: true, totalWaitTime: 3 }
 *
 *   upiRetry(["fail", "fail", "fail", "fail", "fail", "fail"])
 *   // 5 attempts all fail, wait: 1+2+4+8 = 15s (no wait after last)
 *   // => { attempts: 5, success: false, totalWaitTime: 15 }
 */
export function upiRetry(outcomes) {
  // if(!Array.isArray(outcomes) || outcomes.length === 0) {
  //   return { attempts: 0, success: false, totalWaitTime: 0 }; // Invalid input
  // }

  // let attempts = 0;
  // let success = false;
  // let totalWaitTime = 0;

  // do {
  //   const outcome = outcomes[attempts];
  //   attempts ++; // Increment attempt count

  //   if (outcome === "success") {
  //     success = true; // Payment successful, stop retrying
  //     break;
  //   } else if (outcome === "fail") {
  //     // Calculate wait time for this attempt (exponential backoff)
  //     const waitTime = Math.pow(2, attempts - 1); // 1s, 2s, 4s, 8s for attempts 1-4
  //     if (attempts < outcomes.length) { // Only add wait time if we will retry again
  //       totalWaitTime += waitTime; // Add wait time after a failed attempt
  //     }
  //   } else {
  //     // Invalid outcome, treat as fail but don't add wait time
  //     continue;
  //   }
  // } while (attempts < outcomes.length && attempts < 5); // Max 5 attempts

  // return { attempts, success, totalWaitTime };
  /**
   * UPI Retry Logic with Exponential Backoff
   */
  {
    // Validation: Agar array empty hai ya invalid hai
   if(!Array.isArray(outcomes) || outcomes.length === 0) {
   return { attempts: 0, success: false, totalWaitTime: 0 }; // Invalid input
  // }
   }
    let attempts = 0;
    let totalWaitTime = 0;
    let isSuccess = false;
    let currentWait = 1; // Start with 1s

    do {
      // 1. Current attempt ka result check karo
      const currentOutcome = outcomes[attempts];
      attempts++; // Attempt count badhao

      if (currentOutcome === "success") {
        isSuccess = true;
        break; // Success hote hi loop se bahar!
      }

      // 2. Agar fail hua aur next attempt ki gunjayish hai (max 5)
      if (attempts < 5 && attempts < outcomes.length) {
        totalWaitTime += currentWait;
        currentWait *= 2; // Exponential backoff: 1, 2, 4, 8...
      }
    } while (attempts < 5 && attempts < outcomes.length);

    return {
      attempts: attempts,
      success: isSuccess,
      totalWaitTime: totalWaitTime,
    };
  }
}


  // Your code here

