export const formatVND = (number) =>
    number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });