import { GoogleGenAI } from "@google/genai";
import { Expense } from "../context/TripContext";

// In AI Studio Build, GEMINI_API_KEY is available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getBudgetAdvice(budget: number, totalSpent: number, expenses: Expense[]) {
  const prompt = `
    Bạn là một chuyên gia quản lý tài chính du lịch thông minh. 
    Thông tin hiện tại:
    - Tổng ngân sách: ${budget.toLocaleString('vi-VN')} VNĐ
    - Đã chi: ${totalSpent.toLocaleString('vi-VN')} VNĐ
    - Danh sách chi tiêu: ${expenses.map(e => `${e.name} (${e.category}): ${e.amount} VNĐ`).join(', ')}

    Hãy phân tích và đưa ra 1 lời khuyên ngắn gọn (dưới 50 từ), thiết thực và hữu ích cho người dùng để họ có thể quản lý ngân sách tốt hơn trong những ngày tới. Trả về kết quả bằng tiếng Việt.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    return response.text || "Hãy tiếp tục quản lý chi tiêu của bạn thật tốt!";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Hãy cân nhắc kỹ các khoản chi tiêu tiếp theo để đảm bảo ngân sách.";
  }
}
