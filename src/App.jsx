import React, { useState, useEffect } from "react";
import {
  Clock,
  User,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ListChecks,
  ToggleLeft,
  Edit3,
} from "lucide-react";

// --- HÀM HỖ TRỢ ĐẢO NGẪU NHIÊN ---
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// --- DỮ LIỆU CÂU HỎI KHỐI 11 ---
const mcqDataOriginal = [
  {
    id: 1,
    text: "Hệ QTCSDL nào sau đây là phần mềm mã nguồn mở miễn phí phổ biến?",
    options: { A: "SQL Server", B: "Oracle", C: "MySQL", D: "Access" },
    correct: "C",
  },
  {
    id: 2,
    text: "Phần mềm HeidiSQL có chức năng gì?",
    options: {
      A: "Quản lí các tệp tin hệ thống và bảo mật dữ liệu máy tính",
      B: "Soạn thảo và xử lí các văn bản đa phương tiện trực tuyến",
      C: "Phần mềm khách đồ họa hỗ trợ quản trị cơ sở dữ liệu",
      D: "Biên tập và chỉnh sửa các tệp hình ảnh, âm thanh, video",
    },
    correct: "C",
  },
  {
    id: 3,
    text: "Lợi ích chính của việc quản trị CSDL trên máy tính là?",
    options: {
      A: "Trình bày dữ liệu dưới dạng biểu đồ trực quan và sinh động hơn",
      B: "Cập nhật kịp thời, tìm kiếm nhanh chóng và hạn chế sai sót",
      C: "Tự động hóa hoàn toàn thao tác nhập liệu của người dùng",
      D: "Loại bỏ hoàn toàn nhu cầu sao lưu dữ liệu dự phòng định kì",
    },
    correct: "B",
  },
  {
    id: 4,
    text: "Trong HeidiSQL, để tạo một CSDL mới ta thực hiện:",
    options: {
      A: "Nháy nút phải chuột ở vùng danh sách, chọn Tạo mới -> Cơ sở dữ liệu",
      B: "Vào bảng chọn Edit, chọn thư mục New -> Database",
      C: "Vào bảng chọn File, chọn lệnh New -> Workspace",
      D: "Vào bảng chọn Tools, chọn lệnh Create -> Database",
    },
    correct: "A",
  },
  {
    id: 5,
    text: "Khóa chính của bảng dùng để làm gì?",
    options: {
      A: "Liên kết bảng",
      B: "Phân biệt duy nhất mỗi bản ghi",
      C: "Trang trí",
      D: "Ẩn dữ liệu",
    },
    correct: "B",
  },
  {
    id: 6,
    text: "Khóa ngoài là gì?",
    options: {
      A: "Trường dùng để tự động tăng giá trị của bản ghi khi nhập liệu mới",
      B: "Trường tham chiếu đến khóa chính của một bảng dữ liệu khác",
      C: "Trường dùng để lưu trữ các dữ liệu mang tính chất văn bản dài",
      D: "Trường dùng làm khóa dự phòng trong trường hợp mất cấu trúc bảng",
    },
    correct: "B",
  },
  {
    id: 7,
    text: "Kiểu dữ liệu INT thường dùng cho trường nào?",
    options: {
      A: "Tên người",
      B: "Địa chỉ",
      C: "Khóa chính tự động tăng",
      D: "Ngày sinh",
    },
    correct: "C",
  },
  {
    id: 8,
    text: "Lệnh SQL nào dùng để thêm dữ liệu vào bảng?",
    options: {
      A: "ADD INTO",
      B: "INSERT INTO",
      C: "UPDATE INTO",
      D: "ENTER INTO",
    },
    correct: "B",
  },
  {
    id: 9,
    text: "Câu lệnh SQL dùng để truy xuất dữ liệu là :",
    options: { A: "EXTRACT", B: "GET", C: "SELECT", D: "SHOW" },
    correct: "C",
  },
  {
    id: 10,
    text: "Ràng buộc khóa ngoài giúp CSDL đảm bảo tính chất gì?",
    options: {
      A: "Tính độc lập của các tệp tin lưu trữ trên bộ nhớ máy tính",
      B: "Tính nhất quán và toàn vẹn của dữ liệu giữa các bảng có liên kết",
      C: "Tính bảo mật tuyệt đối trước các truy cập trái phép từ bên ngoài",
      D: "Tính tối ưu hóa dung lượng ổ đĩa lưu trữ cho toàn bộ hệ thống",
    },
    correct: "B",
  },
  {
    id: 11,
    text: "Khi cập nhật một trường là khóa ngoài, giá trị nhập vào phải:",
    options: {
      A: "Tồn tại ở trường khóa chính của bảng đang được tham chiếu tới",
      B: "Khác hoàn toàn với mọi giá trị đã có sẵn trong cơ sở dữ liệu",
      C: "Là một chuỗi kí tự đặc biệt và tuyệt đối không được để trống",
      D: "Là một con số nguyên dương có giá trị tăng dần theo thời gian",
    },
    correct: "A",
  },
  {
    id: 12,
    text: "Để liên kết dữ liệu giữa hai bảng trong SQL, ta dùng mệnh đề nào?",
    options: { A: "LINK", B: "CONNECT", C: "INNER JOIN", D: "BIND" },
    correct: "C",
  },
  {
    id: 13,
    text: "Chức năng sao lưu dữ liệu trong HeidiSQL xuất ra tệp tin có đuôi là gì?",
    options: { A: ".txt", B: ".sql", C: ".doc", D: ".db" },
    correct: "B",
  },
  {
    id: 14,
    text: "Trong HeidiSQL, tùy chọn 'Delete + insert' khi sao lưu có ý nghĩa gì?",
    options: {
      A: "Xóa toàn bộ bảng và cấu trúc của cơ sở dữ liệu hiện tại",
      B: "Xóa dữ liệu cũ trong bảng rồi chèn dữ liệu mới từ tệp sao lưu",
      C: "Bỏ qua các bản ghi bị lỗi và tiếp tục chèn phần dữ liệu hợp lệ",
      D: "Tạo một bản sao chép mới độc lập hoàn toàn với dữ liệu gốc",
    },
    correct: "B",
  },
  {
    id: 15,
    text: "Lệnh UPDATE trong SQL đi kèm mệnh đề nào để chỉ định điều kiện?",
    options: { A: "FROM", B: "WHERE", C: "INTO", D: "ON" },
    correct: "B",
  },
  {
    id: 16,
    text: "Để xóa bản ghi chứa thông tin học sinh này mà không làm mất cấu trúc bảng gốc, lệnh SQL nào sau đây là phù hợp nhất?",
    options: { A: "DELETE FROM", B: "REMOVE", C: "DROP", D: "CLEAR" },
    correct: "A",
  },
  {
    id: 17,
    text: "Ảnh số bitmap được tạo thành từ đâu?",
    options: {
      A: "Các đường cong",
      B: "Các điểm ảnh (pixel)",
      C: "Các khối",
      D: "Các vector",
    },
    correct: "B",
  },
  {
    id: 18,
    text: "Độ phân giải của ảnh thường được tính bằng đơn vị gì?",
    options: { A: "dpi", B: "ppi", C: "Cả A và B", D: "kg" },
    correct: "C",
  },
  {
    id: 19,
    text: "Phần mềm GIMP là phần mềm dùng để:",
    options: {
      A: "Soạn thảo văn bản",
      B: "Chỉnh sửa ảnh bitmap",
      C: "Lập trình",
      D: "Quản lý CSDL",
    },
    correct: "B",
  },
  {
    id: 20,
    text: "Giao diện GIMP gồm những thành phần nào?",
    options: {
      A: "Thanh bảng chọn",
      B: "Bảng công cụ",
      C: "Vùng hiển thị ảnh",
      D: "Cả 3 đáp án trên",
    },
    correct: "D",
  },
  {
    id: 21,
    text: "Thao tác phóng to, thu nhỏ ảnh trong GIMP dùng tổ hợp nào?",
    options: {
      A: "Ctrl + cuộn chuột",
      B: "Shift + cuộn chuột",
      C: "Alt + cuộn chuột",
      D: "Tab + cuộn chuột",
    },
    correct: "A",
  },
  {
    id: 22,
    text: "Một bức ảnh phong cảnh chụp tại Na Rì có phần rìa bên trái bị dính một góc của biển báo giao thông không mong muốn. Để loại bỏ phần rìa này, em sẽ ưu tiên sử dụng công cụ nào?",
    options: {
      A: "Công cụ Rotate",
      B: "Công cụ Crop",
      C: "Công cụ Bucket Fill",
      D: "Công cụ Eraser",
    },
    correct: "B",
  },
  {
    id: 23,
    text: "Công cụ Rectangle Select Tool (Phím tắt R) dùng để:",
    options: {
      A: "Chọn vùng hình chữ nhật",
      B: "Chọn vùng hình elip",
      C: "Chọn tự do",
      D: "Xóa vùng chọn",
    },
    correct: "A",
  },
  {
    id: 24,
    text: "Công cụ Ellipse Select Tool (Phím tắt E) dùng để tạo vùng chọn hình gì?",
    options: { A: "Chữ nhật", B: "Tự do", C: "Elip hoặc tròn", D: "Đa giác" },
    correct: "C",
  },
  {
    id: 25,
    text: "Lệnh Brightness-Contrast dùng để tinh chỉnh gì?",
    options: {
      A: "Màu sắc",
      B: "Độ sáng và độ tương phản",
      C: "Kích thước",
      D: "Độ nét",
    },
    correct: "B",
  },
  {
    id: 26,
    text: "Công cụ Color Balance điều chỉnh màu ở mấy dải độ sáng?",
    options: { A: "1", B: "2", C: "3 (Shadows, Midtones, Highlights)", D: "4" },
    correct: "C",
  },
  {
    id: 27,
    text: "Hue-Saturation cho phép tinh chỉnh yếu tố nào?",
    options: {
      A: "Tông màu",
      B: "Độ bão hòa",
      C: "Độ sáng",
      D: "Cả 3 yếu tố trên",
    },
    correct: "D",
  },
  {
    id: 28,
    text: "Vùng chọn (Selection) trong GIMP giúp em làm gì?",
    options: {
      A: "Tự động xóa bỏ phông nền của toàn bộ bức ảnh đang chỉnh sửa",
      B: "Giới hạn phạm vi tác động của công cụ trong một khu vực cụ thể",
      C: "Chuyển đổi định dạng tệp tin ảnh sang một chuẩn mở rộng khác",
      D: "Gộp tất cả các lớp ảnh đang có lại thành một khung hình duy nhất",
    },
    correct: "B",
  },
  {
    id: 29,
    text: "Mỗi lớp ảnh (Layer) trong GIMP có vai trò gì?",
    options: {
      A: "Chứa các đối tượng đồ họa riêng biệt để có thể xử lí độc lập",
      B: "Làm tăng đáng kể dung lượng lưu trữ của tệp tin ảnh đầu ra",
      C: "Tự động áp dụng các hiệu ứng chuyển cảnh cho đối tượng được chọn",
      D: "Tăng độ phân giải và chất lượng hiển thị khi đem in ấn bức ảnh",
    },
    correct: "A",
  },
  {
    id: 30,
    text: "Biểu tượng 'con mắt' cạnh một lớp ảnh trong GIMP có ý nghĩa gì?",
    options: {
      A: "Đổi màu",
      B: "Ẩn/hiện lớp ảnh đó",
      C: "Xóa lớp",
      D: "Gộp lớp",
    },
    correct: "B",
  },
  {
    id: 31,
    text: "Nếu một lớp ảnh có kênh Alpha, khi dùng cục tẩy (Eraser) thì vùng bị xóa sẽ có màu gì?",
    options: {
      A: "Màu Foreground",
      B: "Màu Background",
      C: "Trở nên trong suốt",
      D: "Đen",
    },
    correct: "C",
  },
  {
    id: 32,
    text: "Màu Foreground trong GIMP được hiểu là:",
    options: {
      A: "Màu nền",
      B: "Màu nổi (dùng để vẽ thêm)",
      C: "Màu viền",
      D: "Màu trong suốt",
    },
    correct: "B",
  },
  {
    id: 33,
    text: "Màu Background trong GIMP được hiểu là:",
    options: {
      A: "Màu nổi",
      B: "Màu nền (màu của giấy vẽ)",
      C: "Màu chữ",
      D: "Khung hình",
    },
    correct: "B",
  },
  {
    id: 34,
    text: "Em muốn đổ một màu vàng đồng nhất lấp đầy toàn bộ không gian bên trong một vùng chọn nhanh nhất. Công cụ nào sau đây sẽ giúp em?",
    options: {
      A: "Bucket Fill (Phím tắt Shift+B)",
      B: "Paint Brush (Phím tắt P)",
      C: "Gradient (Phím tắt G)",
      D: "Color Balance",
    },
    correct: "A",
  },
  {
    id: 35,
    text: "Công cụ Gradient dùng để:",
    options: {
      A: "Tô màu thuần",
      B: "Tô màu chuyển sắc",
      C: "Lấy mẫu màu",
      D: "Viết chữ",
    },
    correct: "B",
  },
  {
    id: 36,
    text: "Để lấy phần tường lành lặn bên cạnh 'đắp' đè lên chính xác vết tróc mà không cần phần mềm tự động điều chỉnh ánh sáng, em nên dùng công cụ nào?",
    options: {
      A: "Công cụ Healing",
      B: "Công cụ Clone",
      C: "Công cụ Bucket Fill",
      D: "Công cụ Free Select",
    },
    correct: "B",
  },
  {
    id: 37,
    text: "Công cụ Healing khác Clone ở điểm nào?",
    options: {
      A: "Tự động nhận diện và loại bỏ các đối tượng thừa mà không cần lấy vùng mẫu",
      B: "Tự động hòa trộn ánh sáng, màu sắc của vùng mẫu cho khớp với môi trường đích",
      C: "Chỉ áp dụng được cho việc chỉnh sửa ảnh vector mà không dùng được cho ảnh bitmap",
      D: "Chỉ sao chép được màu sắc cơ bản chứ không thể sao chép kết cấu bề mặt ảnh",
    },
    correct: "B",
  },
  {
    id: 38,
    text: "Khi dùng công cụ Clone/Healing, giữ phím nào để lấy vùng mẫu?",
    options: { A: "Shift", B: "Ctrl", C: "Alt", D: "Space" },
    correct: "B",
  },
  {
    id: 39,
    text: "Mô hình tạo ảnh động trong GIMP sử dụng yếu tố nào làm khung hình (frame)?",
    options: {
      A: "Tệp tin",
      B: "Lớp ảnh (layer)",
      C: "Vùng chọn",
      D: "Điểm ảnh",
    },
    correct: "B",
  },
  {
    id: 40,
    text: "Các lớp ảnh trong GIMP hiển thị theo thứ tự nào?",
    options: {
      A: "Từ trên xuống dưới",
      B: "Từ dưới lên trên",
      C: "Ngẫu nhiên",
      D: "Trái sang phải",
    },
    correct: "A",
  },
  {
    id: 41,
    text: "Lệnh Merge Down trong GIMP dùng để:",
    options: {
      A: "Tách lớp ảnh hiện tại thành hai lớp hoàn toàn độc lập với nhau",
      B: "Gộp lớp ảnh hiện tại với lớp ảnh nằm ngay phía dưới nó trong danh sách",
      C: "Nhân đôi lớp ảnh hiện tại để chuẩn bị tạo hiệu ứng đổ bóng cho vật thể",
      D: "Xóa bỏ vĩnh viễn lớp ảnh đang được chọn ra khỏi vùng làm việc hiện tại",
    },
    correct: "B",
  },
  {
    id: 42,
    text: "Để tạo hiệu ứng ảnh động mượt mà, ta cần điều chỉnh thông số nào?",
    options: {
      A: "Cân bằng lại độ tương phản và độ sáng tối của từng khung hình",
      B: "Thời gian chờ (Delay) trước khi chuyển tiếp giữa các khung hình",
      C: "Số lượng màu sắc hiển thị đồng thời trên cùng một hệ màu RGB",
      D: "Kích thước và độ phân giải xuất bản của toàn bộ tệp tin ảnh động",
    },
    correct: "B",
  },
  {
    id: 43,
    text: "Ngăn tư liệu trong phần mềm biên tập phim chứa những gì?",
    options: {
      A: "Hiệu ứng",
      B: "Tệp ảnh, video, âm thanh đầu vào",
      C: "Phụ đề",
      D: "Nút xuất phim",
    },
    correct: "B",
  },
  {
    id: 44,
    text: "Ảnh bitmap có độ phân giải càng cao thì:",
    options: {
      A: "Ảnh càng nhỏ",
      B: "Ảnh càng mờ",
      C: "Ảnh càng rõ nét",
      D: "Dung lượng ảnh càng thấp",
    },
    correct: "C",
  },
  {
    id: 45,
    text: "Để xuất ảnh ra định dạng thông dụng (.jpg, .png) trong GIMP, ta dùng lệnh:",
    options: {
      A: "File -> Save",
      B: "File -> Export As",
      C: "Edit -> Copy",
      D: "File -> Open",
    },
    correct: "B",
  },
  {
    id: 46,
    text: "Công cụ Free Select Tool dùng để:",
    options: {
      A: "Chọn vùng chữ nhật",
      B: "Tạo vùng chọn có hình dạng tùy ý",
      C: "Chọn vùng elip",
      D: "Bỏ vùng chọn",
    },
    correct: "B",
  },
  {
    id: 47,
    text: "Nếu phần phông nền của 'Lớp nhân vật' (nằm trên) không được xóa trong suốt, điều gì sẽ xảy ra khi hiển thị đè lên 'Lớp phong cảnh' (nằm dưới)?",
    options: {
      A: "'Lớp phong cảnh' sẽ đè lên che mất nhân vật.",
      B: "'Lớp nhân vật' sẽ che khuất phần 'Lớp phong cảnh' ngay bên dưới nó.",
      C: "Cả hai lớp sẽ tự động hòa trộn ánh sáng vào nhau để hiển thị.",
      D: "Phần mềm sẽ báo lỗi do hai lớp có kích thước chồng chéo lên nhau.",
    },
    correct: "B",
  },
  {
    id: 48,
    text: "Kênh Alpha của lớp ảnh giúp ta tạo ra:",
    options: {
      A: "Độ bóng",
      B: "Vùng trong suốt khi xóa",
      C: "Màu đen",
      D: "Lớp ảnh động",
    },
    correct: "B",
  },
  {
    id: 49,
    text: "Phân biệt màu nổi và màu nền trong GIMP giúp ta:",
    options: {
      A: "Quản lí và xóa bỏ dễ dàng các khu vực có màu sắc trùng lặp trên ảnh",
      B: "Chủ động chọn màu khi vẽ thêm chi tiết mới hoặc khi tẩy xóa điểm ảnh",
      C: "Tự động đồng bộ tên tệp tin lưu trữ dựa trên hệ màu đang sử dụng",
      D: "Thay đổi nhanh chóng kích thước của đối tượng mà không làm vỡ nét",
    },
    correct: "B",
  },
  {
    id: 50,
    text: "Dải màu Shadows trong Color Balance dùng để chỉnh màu ở vùng nào?",
    options: {
      A: "Vùng sáng",
      B: "Vùng tối",
      C: "Vùng trung bình",
      D: "Cả bức ảnh",
    },
    correct: "B",
  },
  {
    id: 51,
    text: "Dải màu Highlights trong Color Balance dùng để chỉnh màu ở vùng nào?",
    options: {
      A: "Vùng tối",
      B: "Vùng sáng",
      C: "Vùng trung bình",
      D: "Chỉ ảnh phong cảnh",
    },
    correct: "B",
  },
  {
    id: 52,
    text: "Để thu phóng ảnh trong GIMP, công cụ nào sau đây được sử dụng?",
    options: { A: "Zoom", B: "Rotate", C: "Crop", D: "Text" },
    correct: "A",
  },
  {
    id: 53,
    text: "Công cụ nào trong GIMP giải quyết vấn đề dựng đứng bức ảnh bị nằm ngang cho đúng chiều?",
    options: { A: "Zoom", B: "Crop", C: "Rotate", D: "Bucket Fill" },
    correct: "C",
  },
  {
    id: 54,
    text: "Lệnh Invert (Đảo ngược vùng chọn) nằm trong menu nào của GIMP?",
    options: { A: "File", B: "Edit", C: "Select", D: "View" },
    correct: "C",
  },
  {
    id: 55,
    text: "'Pixel' là thuật ngữ dùng để chỉ:",
    options: { A: "Bức tranh", B: "Điểm ảnh", C: "Máy ảnh", D: "Lớp ảnh" },
    correct: "B",
  },
  {
    id: 56,
    text: "Sự khác biệt giữa ảnh bitmap và ảnh vector là?",
    options: {
      A: "Ảnh bitmap được tạo từ các điểm ảnh có màu, ảnh vector được tạo từ thuật toán",
      B: "Ảnh bitmap duy trì độ sắc nét tốt hơn ảnh vector khi bị thu phóng nhiều lần",
      C: "Ảnh vector luôn có độ phân giải cố định và dung lượng lớn hơn ảnh bitmap",
      D: "Ảnh bitmap chỉ dùng để vẽ sơ đồ, ảnh vector dùng cho chụp ảnh phong cảnh",
    },
    correct: "A",
  },
  {
    id: 57,
    text: "Công cụ nào tự động lấy mẫu màu ở vùng xung quanh để lấp đi vết xước?",
    options: { A: "Clone", B: "Healing", C: "Eraser", D: "Paint Brush" },
    correct: "B",
  },
  {
    id: 58,
    text: "Việc thiết lập khóa ngoài (Foreign Key) trên HeidiSQL thực hiện ở thẻ nào?",
    options: { A: "Basic", B: "Foreign keys", C: "Indexes", D: "Options" },
    correct: "B",
  },
  {
    id: 59,
    text: "Để xóa dữ liệu cũ và chèn dữ liệu mới khi phục hồi CSDL, chọn tùy chọn nào?",
    options: { A: "Insert", B: "Delete + insert", C: "Drop", D: "Replace" },
    correct: "B",
  },
  {
    id: 60,
    text: "Câu lệnh SELECT * FROM casi; có tác dụng gì?",
    options: {
      A: "Xóa bảng ca sĩ",
      B: "Thêm ca sĩ",
      C: "Lấy tất cả thông tin từ bảng ca sĩ",
      D: "Sửa tên ca sĩ",
    },
    correct: "C",
  },
  {
    id: 61,
    text: "Trong câu lệnh truy vấn SQL, em bắt buộc phải sử dụng mệnh đề nào để thực hiện việc sắp xếp dữ liệu giảm dần?",
    options: {
      A: "Mệnh đề WHERE",
      B: "Mệnh đề INNER JOIN",
      C: "Mệnh đề ORDER BY",
      D: "Mệnh đề SELECT",
    },
    correct: "C",
  },
  {
    id: 62,
    text: "Phím tắt Ctrl + cuộn chuột trong GIMP thực hiện thao tác gì?",
    options: {
      A: "Cắt ảnh",
      B: "Xoay ảnh",
      C: "Phóng to/thu nhỏ ảnh",
      D: "Lưu ảnh",
    },
    correct: "C",
  },
  {
    id: 63,
    text: "Việc gộp 2 lớp ảnh bằng Merge Down sẽ gộp lớp hiện tại với lớp nào?",
    options: {
      A: "Lớp trên cùng",
      B: "Lớp ngay dưới nó",
      C: "Lớp dưới cùng",
      D: "Bất kỳ lớp nào",
    },
    correct: "B",
  },
  {
    id: 64,
    text: "Đặc tính 'Delay' trong ảnh động GIF xác định điều gì?",
    options: {
      A: "Mức độ phân giải tối đa cho phép hiển thị của tệp tin ảnh động đó",
      B: "Độ mờ dần của các lớp hiệu ứng chuyển cảnh xếp chồng lên nhau",
      C: "Khoảng thời gian dừng lại để hiển thị của mỗi khung hình trước khi chuyển",
      D: "Kích thước dung lượng vật lí giới hạn của tệp tin khi lưu trữ trên đĩa",
    },
    correct: "C",
  },
  {
    id: 65,
    text: "Tẩy điểm ảnh bằng Eraser trên lớp ảnh không có kênh Alpha sẽ hiện ra:",
    options: {
      A: "Màu trong suốt",
      B: "Màu nền (Background)",
      C: "Màu nổi (Foreground)",
      D: "Màu đen",
    },
    correct: "B",
  },
  {
    id: 66,
    text: "Lệnh INNER JOIN dùng để làm gì?",
    options: {
      A: "Truy xuất và kết hợp dữ liệu từ hai bảng thông qua một trường liên kết chung",
      B: "Xóa đồng thời toàn bộ cấu trúc và dữ liệu của hai bảng trong cơ sở dữ liệu",
      C: "Tạo ra một bảng dữ liệu mới hoàn toàn dựa trên sự sao chép cấu trúc bảng cũ",
      D: "Cập nhật và chỉnh sửa dữ liệu đồng loạt cho nhiều bản ghi trên các bảng khác nhau",
    },
    correct: "A",
  },
];

const tfDataOriginal = [
  {
    id: 1,
    text: "Quản trị cơ sở dữ liệu trên máy tính mang lại nhiều lợi ích to lớn như giảm thiểu sai sót, hạn chế dư thừa và hỗ trợ tìm kiếm dữ liệu. Khi thao tác quản lí dữ liệu thông qua phần mềm HeidiSQL, người dùng cần nắm vững các đặc điểm:",
    statements: {
      a: "Phần mềm HeidiSQL là công cụ có giao diện đồ họa hỗ trợ trực tiếp việc quản trị và truy vấn hệ CSDL MySQL.",
      b: "Lệnh DELETE FROM có chức năng xóa vĩnh viễn cấu trúc của bảng dữ liệu thay vì chỉ xóa các bản ghi.",
      c: "HeidiSQL cho phép người dùng khai báo các trường khóa ngoài (Foreign Key) để liên kết dữ liệu giữa các bảng một cách trực quan.",
      d: "Khi chèn dữ liệu mới vào bảng, giá trị tại trường khóa ngoài không nhất thiết phải tồn tại ở bảng khóa chính.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 2,
    text: "Việc cập nhật dữ liệu (thêm, sửa, xóa) trong các bảng của cơ sở dữ liệu quan hệ phải luôn tuân thủ các ràng buộc toàn vẹn, đặc biệt là ràng buộc khóa ngoài. Khi sử dụng câu lệnh SQL để thao tác trên bảng có tham chiếu:",
    statements: {
      a: "Giá trị được nhập vào trường khóa ngoài bắt buộc phải trùng khớp với một giá trị đã tồn tại trong trường khóa chính của bảng tham chiếu.",
      b: "Lệnh INSERT INTO có thể được sử dụng để thay đổi cấu trúc của bảng, ví dụ như thêm một cột (trường) dữ liệu mới.",
      c: "Hệ quản trị CSDL sẽ báo lỗi và ngăn chặn lệnh xóa nếu cố tình xóa một bản ghi ở bảng chính đang được bảng khác tham chiếu.",
      d: "Tùy chọn 'Delete + insert' khi phục hồi CSDL có nghĩa là bỏ qua các dữ liệu lỗi thay vì xóa dữ liệu hiện tại.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 3,
    text: "Hiểu biết về khái niệm ảnh số và ảnh bitmap là kiến thức nền tảng quan trọng trước khi bước vào các thao tác đồ họa chuyên sâu. Các đặc điểm về chất lượng, độ phân giải và cấu tạo của một bức ảnh bitmap bao gồm:",
    statements: {
      a: "Ảnh bitmap được cấu tạo từ một lưới các điểm ảnh (pixel), mỗi điểm ảnh mang một giá trị màu sắc và độ sáng nhất định.",
      b: "Khi phóng to một bức ảnh bitmap lên nhiều lần, chất lượng hình ảnh vẫn giữ nguyên độ sắc nét tuyệt đối và không bao giờ bị vỡ hạt.",
      c: "Chỉ số dpi (dots per inch) được dùng để đo độ phân giải của ảnh, chỉ số này càng cao thì ảnh in ra càng sắc nét và chi tiết.",
      d: "Ảnh bitmap luôn có dung lượng nhỏ hơn rất nhiều so với ảnh vector nên là lựa chọn duy nhất khi thiết kế bản vẽ kĩ thuật.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 4,
    text: "Phần mềm chỉnh sửa ảnh GIMP làm việc chủ yếu với ảnh bitmap, cung cấp hệ thống công cụ phong phú để can thiệp vào từng phần của bức ảnh. Khi sử dụng các công cụ tinh chỉnh màu sắc và công cụ chọn, ta cần lưu ý:",
    statements: {
      a: "Công cụ Color Balance cho phép điều chỉnh màu sắc độc lập trên ba dải độ sáng: vùng tối (Shadows), trung bình (Midtones) và vùng sáng (Highlights).",
      b: "Công cụ Free Select Tool chỉ cho phép tạo các vùng chọn có hình dạng khuôn mẫu như hình chữ nhật hoặc hình elip.",
      c: "Vùng chọn (Selection) giúp ta giới hạn phạm vi tác động của các lệnh chỉnh màu trên một khu vực cụ thể mà không ảnh hưởng toàn bộ ảnh.",
      d: "Chức năng Brightness-Contrast dùng để điều chỉnh độ bão hòa (rực rỡ) của màu sắc trong ảnh thay vì ánh sáng.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 5,
    text: "Lớp ảnh (Layer) trong phần mềm GIMP đóng vai trò cốt lõi giúp người dùng có thể can thiệp, chỉnh sửa riêng biệt từng đối tượng mà không ảnh hưởng đến tổng thể. Nguyên lí hoạt động và quản lí của các lớp ảnh được thể hiện như sau:",
    statements: {
      a: "Lớp ảnh nằm trên cùng trong bảng Layer sẽ che khuất các điểm ảnh không trong suốt của lớp ảnh nằm trực tiếp bên dưới nó.",
      b: "Biểu tượng hình 'con mắt' bên cạnh mỗi lớp ảnh dùng để gộp lớp đó vĩnh viễn với các lớp khác thành một khung hình duy nhất.",
      c: "Lệnh Merge Down được sử dụng trên phần mềm để gộp lớp ảnh đang được chọn với lớp ảnh nằm ngay bên dưới nó.",
      d: "Hệ thống GIMP không cho phép người dùng thay đổi thứ tự hiển thị (kéo lên trên hoặc xuống dưới) sau khi lớp ảnh đã được tạo.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 6,
    text: "Trong quá trình xử lí ảnh số, người dùng thường xuyên sử dụng các công cụ vẽ và thiết lập màu sắc để phục chế hoặc sáng tạo hình ảnh mới. Sự khác biệt giữa các công cụ và cấu hình màu nền/màu nổi được quy định rõ:",
    statements: {
      a: "Kênh Alpha của một lớp ảnh là thành phần chịu trách nhiệm quản lí thông tin về độ trong suốt của các điểm ảnh.",
      b: "Công cụ Bucket Fill được sử dụng chuyên biệt để tạo ra một dải màu chuyển sắc (gradient) từ màu nổi sang màu nền.",
      c: "Màu nổi (Foreground) thường được sử dụng làm màu mực mặc định khi vẽ thêm các chi tiết mới bằng công cụ Paint Brush.",
      d: "Nếu dùng cục tẩy (Eraser) xóa trên một lớp ảnh không có kênh Alpha, vùng bị xóa sẽ luôn trở nên trong suốt hoàn toàn.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 7,
    text: "Để phục chế các bức ảnh cũ bị xước hoặc loại bỏ các chi tiết thừa trên ảnh chụp, GIMP cung cấp các công cụ sao chép điểm ảnh rất hiệu quả. Khi áp dụng các công cụ này vào thực tế, người dùng cần phân biệt rõ cơ chế hoạt động:",
    statements: {
      a: "Công cụ Healing hoạt động bằng cách tự động hòa trộn màu sắc và ánh sáng của vùng được dán sao cho khớp với môi trường xung quanh.",
      b: "Công cụ Clone chỉ được sử dụng để sao chép các dải màu Gradient chứ không thể sao chép hình dáng của các vật thể.",
      c: "Khi sử dụng cả công cụ Healing và Clone, người dùng đều phải nhấn giữ phím Ctrl và nháy chuột để lấy điểm mẫu (vùng nguồn).",
      d: "Khi dùng Healing để xóa một chiếc xe trên đường, phần mềm sẽ tự động vẽ thêm một chiếc xe khác có màu sắc tương tự vào thay thế.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 8,
    text: "Phần mềm GIMP hỗ trợ khả năng tạo ảnh động dạng GIF bằng cách kết hợp và xử lí tuần tự nhiều lớp ảnh (layer) lại với nhau. Khi thiết kế một tệp ảnh động đơn giản, việc thiết lập các thông số tuân theo nguyên tắc:",
    statements: {
      a: "Mỗi lớp ảnh (Layer) trong tệp thiết kế ảnh động sẽ đóng vai trò hiển thị tương ứng với một khung hình (frame) riêng biệt.",
      b: "Để bức ảnh có thể chuyển động trong GIMP, người dùng bắt buộc phải xuất tệp tin dưới định dạng hình ảnh là .jpg hoặc .png.",
      c: "Thông số 'Delay between frames where unspecified' cho phép người dùng thiết lập thời gian dừng (độ trễ) giữa các khung hình.",
      d: "Khi trình chiếu ảnh động, phần mềm sẽ tự động hiển thị cùng lúc tất cả các lớp ảnh để tạo hiệu ứng chuyển động ba chiều.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 9,
    text: "Ngôn ngữ truy vấn SQL cung cấp các mệnh đề mạnh mẽ giúp người dùng lọc và trích xuất dữ liệu chính xác theo yêu cầu. Trong quá trình viết câu lệnh truy vấn, học sinh cần nắm vững quy tắc của các mệnh đề:",
    statements: {
      a: "Mệnh đề WHERE được sử dụng để thiết lập điều kiện lọc, giúp chỉ trích xuất ra các bản ghi thỏa mãn yêu cầu cụ thể.",
      b: "Lệnh SELECT mặc định bắt buộc phải trích xuất toàn bộ các cột trong bảng và không thể chọn xuất các cột riêng lẻ.",
      c: "Mệnh đề ORDER BY nếu không có khai báo gì thêm sẽ tự động sắp xếp dữ liệu theo chiều giảm dần (DESC).",
      d: "Việc sử dụng phép nối INNER JOIN sẽ tự động ghép mọi dữ liệu của hai bảng lại với nhau mà không cần chỉ định trường (cột) liên kết.",
    },
    correct: { a: "True", b: "False", c: "False", d: "False" },
  },
  {
    id: 10,
    text: "Thiết kế bảng và chọn kiểu dữ liệu là bước nền tảng quyết định hiệu năng của toàn bộ Cơ sở dữ liệu. Khi tạo lập bảng trên HeidiSQL, người thiết kế cần hiểu rõ đặc tính của các ràng buộc:",
    statements: {
      a: "Thuộc tính AUTO_INCREMENT giúp một trường (thường là khóa chính) tự động tăng giá trị lên 1 đơn vị mỗi khi có bản ghi mới được thêm vào.",
      b: "Khóa chính (Primary Key) của một bảng bắt buộc phải là kiểu dữ liệu số (INT) và tuyệt đối không được phép dùng kiểu văn bản (VARCHAR).",
      c: "Trong cơ sở dữ liệu quan hệ, một bảng có thể được thiết lập nhiều khóa chính khác nhau để quản lí các nhóm dữ liệu riêng biệt.",
      d: "Kiểu dữ liệu INT chuyên dùng để lưu trữ các giá trị số nguyên như năm sinh, số lượng sản phẩm hoặc điểm số làm tròn.",
    },
    correct: { a: "True", b: "False", c: "False", d: "True" },
  },
  {
    id: 11,
    text: "Quản lí tệp tin và trích xuất sản phẩm đồ họa trong GIMP đòi hỏi người dùng phân biệt rõ các định dạng lưu trữ. Về thao tác lưu và xuất tệp ảnh, nguyên lí hoạt động được quy định như sau:",
    statements: {
      a: "Thao tác Export As cho phép người dùng xuất thành phẩm từ GIMP ra các định dạng ảnh phổ biến để chia sẻ như .jpg hoặc .png.",
      b: "Lệnh Save (Lưu tệp) mặc định sẽ tự động nén ảnh thành định dạng .jpg để tối ưu hóa dung lượng ổ đĩa.",
      c: "Khi xuất ảnh có chứa vùng trong suốt (kênh Alpha) sang định dạng .jpg, phần mềm sẽ tự động chuyển các vùng trong suốt đó thành màu trắng.",
      d: "Việc ẩn một lớp ảnh (tắt biểu tượng con mắt) sẽ tự động xóa vĩnh viễn dữ liệu của lớp đó khỏi dự án để máy tính chạy nhanh hơn.",
    },
    correct: { a: "True", b: "False", c: "True", d: "False" },
  },
  {
    id: 12,
    text: "Các công cụ tạo vùng chọn và biến đổi hình dáng (Transform Tools) giúp người dùng GIMP can thiệp vào cấu trúc bức ảnh. Khi thao tác trên các vùng chọn và đối tượng, cần lưu ý:",
    statements: {
      a: "Khi một vùng chọn đang hoạt động (có nét đứt nhấp nháy bao quanh), mọi thao tác tô màu hay xóa điểm ảnh sẽ chỉ có tác dụng ở khu vực bên trong vùng chọn đó.",
      b: "Lệnh Invert (Đảo ngược vùng chọn) có tác dụng lật ngược hình ảnh từ trái sang phải giống như khi soi gương.",
      c: "Công cụ Scale chỉ cho phép phóng to, thu nhỏ toàn bộ khung vẽ chứ không thể thay đổi kích thước của một lớp ảnh (layer) riêng biệt.",
      d: "Công cụ Crop (Cắt xén) có thể dùng để cắt bỏ những chi tiết thừa ở viền ảnh, giúp bố cục lại trọng tâm của bức hình.",
    },
    correct: { a: "True", b: "False", c: "False", d: "True" },
  },
];

const essayDataOriginal = [
  {
    id: 1,
    text: "Hãy trình bày ngắn gọn vai trò của Khóa chính (Primary Key) và Khóa ngoài (Foreign Key) trong việc tổ chức và liên kết các bảng của cơ sở dữ liệu quan hệ. Lấy một ví dụ thực tế minh họa.",
    hint: "Gợi ý: Khóa chính giúp phân biệt duy nhất mỗi bản ghi trong một bảng (vd: Mã HS). Khóa ngoài là trường tham chiếu đến khóa chính của bảng khác để tạo mối liên kết (vd: Mã HS trong bảng Điểm).",
  },
  {
    id: 2,
    text: "Cho hai bảng dữ liệu: HocSinh (idHocSinh, hoTen) và Diem (idDiem, idHocSinh, monHoc, soDiem). Hãy viết một câu lệnh SQL sử dụng mệnh đề INNER JOIN để hiển thị danh sách gồm: Họ tên học sinh, Môn học và Số điểm.",
    hint: "Gợi ý: SELECT HocSinh.hoTen, Diem.monHoc, Diem.soDiem FROM HocSinh INNER JOIN Diem ON HocSinh.idHocSinh = Diem.idHocSinh;",
  },
  {
    id: 3,
    text: "Việc thiết lập khóa ngoài trên phần mềm HeidiSQL giúp bảo đảm 'Tính nhất quán và toàn vẹn dữ liệu'. Em hãy lấy một ví dụ để giải thích tại sao hệ quản trị CSDL lại ngăn chặn việc xóa một bản ghi ở bảng khóa chính khi bản ghi đó đang được tham chiếu bởi một bảng khác.",
    hint: "Gợi ý: Nếu xóa Học sinh 'Nguyễn Văn A' ở bảng HọcSinh, thì các bản ghi điểm của 'Nguyễn Văn A' ở bảng Điểm sẽ bị 'mồ côi' (lỗi toàn vẹn dữ liệu).",
  },
  {
    id: 4,
    text: "Nêu sự khác biệt cơ bản giữa ảnh số bitmap và ảnh vector. Giải thích ý nghĩa của chỉ số độ phân giải dpi (dots per inch) và sự ảnh hưởng của nó đến chất lượng khi in ấn một bức ảnh bitmap.",
    hint: "Gợi ý: Bitmap tạo từ pixel, dễ vỡ hạt khi phóng to. Vector tạo từ thuật toán toán học, thu phóng không vỡ hạt. dpi là số điểm ảnh trên 1 inch vuông, dpi càng cao in ra càng sắc nét.",
  },
  {
    id: 5,
    text: "Khi cần xóa một vết xước hoặc một chi tiết thừa trên ảnh bằng phần mềm GIMP, ta có thể dùng công cụ Clone hoặc Healing. Theo em, sự khác nhau về nguyên lí hoạt động của hai công cụ này là gì? Khi nào nên ưu tiên dùng công cụ Healing?",
    hint: "Gợi ý: Clone sao chép y hệt điểm ảnh nguồn. Healing sao chép nhưng tự động hòa trộn màu sắc và ánh sáng cho khớp với vùng xung quanh. Ưu tiên Healing khi xóa vết trên da, bầu trời...",
  },
  {
    id: 6,
    text: "Hãy giải thích khái niệm và vai trò của Lớp ảnh (Layer) trong phần mềm chỉnh sửa ảnh GIMP. Nêu ít nhất ba tác vụ cơ bản mà người dùng có thể thao tác với lớp ảnh.",
    hint: "Gợi ý: Layer như các tấm kính trong suốt xếp chồng lên nhau, giúp chỉnh sửa từng chi tiết độc lập. Thao tác: Ẩn/Hiện, Thêm mới, Xóa, Gộp (Merge), Đổi thứ tự.",
  },
  {
    id: 7,
    text: "Trong phần mềm GIMP, kênh Alpha của một lớp ảnh đóng vai trò gì? Hãy trình bày sự khác biệt giữa 'Màu nổi' (Foreground) và 'Màu nền' (Background) khi ta sử dụng cục tẩy (Eraser) lên một lớp ảnh không có kênh Alpha.",
    hint: "Gợi ý: Kênh Alpha chứa thông tin độ trong suốt. Nếu không có Alpha, xóa bằng Eraser sẽ lộ ra 'Màu nền' (Background color) chứ không tạo ra nền trong suốt.",
  },
  {
    id: 8,
    text: "Trình bày chi tiết các bước sử dụng công cụ chọn (Select Tool) và công cụ tô màu (Bucket Fill/ Hue-Saturation) để tách một quả bóng màu đỏ ra khỏi nền cũ và đổi nền phía sau quả bóng thành một màu xanh trong GIMP.",
    hint: "Gợi ý: B1: Dùng Fuzzy Select/Free Select chọn nền cũ. B2: Chọn màu xanh cho Foreground. B3: Dùng Bucket Fill đổ màu vào vùng đang chọn.",
  },
  {
    id: 9,
    text: "Bạn A thiết kế CSDL quản lí thư viện. Bảng MuonSach nhập mã 'S099', thực tế KhoSach chỉ có 'S001'-'S050'. Tại sao hệ thống vẫn cho phép nhập thành công? Bạn A quên thiết lập gì? Nêu cách khắc phục trên HeidiSQL.",
    hint: "Gợi ý: Quên thiết lập Khóa ngoài (Foreign Key) cho cột Mã sách ở bảng Mượn sách tham chiếu đến Kho sách. Khắc phục: Vào thẻ Foreign keys, tạo liên kết để ép buộc tính toàn vẹn.",
  },
  {
    id: 10,
    text: "Viết 02 câu lệnh SQL cho bảng DiemThi (MaHS, HoTen, DiemToan, DiemTin): Cập nhật DiemTin thành 10 cho MaHS 'HS012'. Xóa vĩnh viễn học sinh MaHS 'HS099'.",
    hint: "Gợi ý: Lệnh 1: UPDATE DiemThi SET DiemTin = 10 WHERE MaHS = 'HS012'; Lệnh 2: DELETE FROM DiemThi WHERE MaHS = 'HS099';",
  },
  {
    id: 11,
    text: "Trình bày các bước cơ bản trong phần mềm GIMP (công cụ chọn, kênh Alpha, thao tác dán) để 'cắt' chân dung học sinh trên sân trường ghép sang nền hoàng hôn.",
    hint: "Gợi ý: B1: Thêm Alpha Channel (nếu chưa có). B2: Dùng Free Select bao quanh chân dung. B3: Copy. B4: Mở ảnh hoàng hôn, Paste as New Layer. Dùng Move/Scale để chỉnh.",
  },
  {
    id: 12,
    text: "Đề xuất ít nhất 02 công cụ/lệnh trong GIMP để khắc phục: bức ảnh bị nằm nghiêng (chụp lệch tay) và màu sắc tổng thể bị tối, thiếu sức sống.",
    hint: "Gợi ý: Lỗi nghiêng dùng công cụ Rotate Tool (Shift+R) để xoay phẳng lại. Lỗi tối dùng Brightness-Contrast hoặc Color Balance để tăng độ sáng và bão hòa màu.",
  },
];

export default function App() {
  const [studentInfo, setStudentInfo] = useState({ name: "", class: "" });
  const [activeTab, setActiveTab] = useState("mcq");
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [scores, setScores] = useState({ mcq: 0, tf: 0, total: 0 });

  const [quizData, setQuizData] = useState(() => {
    const shuffledMcq = shuffleArray(mcqDataOriginal).map((q) => {
      const correctValue = q.options[q.correct];
      const values = Object.values(q.options);
      const shuffledValues = shuffleArray(values);
      const newOptions = {};
      let newCorrect = "";
      const labels = ["A", "B", "C", "D"];
      shuffledValues.forEach((val, index) => {
        newOptions[labels[index]] = val;
        if (val === correctValue) {
          newCorrect = labels[index];
        }
      });
      return { ...q, options: newOptions, correct: newCorrect };
    });

    const shuffledTf = shuffleArray(tfDataOriginal).map((q) => {
      const statementEntries = Object.entries(q.statements);
      const shuffledEntries = shuffleArray(statementEntries);
      const newStatements = {};
      const newCorrect = {};
      const labels = ["a", "b", "c", "d"];
      shuffledEntries.forEach(([oldKey, statementText], index) => {
        const newLabel = labels[index];
        newStatements[newLabel] = statementText;
        newCorrect[newLabel] = q.correct[oldKey];
      });
      return { ...q, statements: newStatements, correct: newCorrect };
    });

    const shuffledEssay = shuffleArray(essayDataOriginal);
    return { mcq: shuffledMcq, tf: shuffledTf, essay: shuffledEssay };
  });

  const [mcqAnswers, setMcqAnswers] = useState({});
  const [tfAnswers, setTfAnswers] = useState({});
  const [essayAnswers, setEssayAnswers] = useState({});

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleForceSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleMcqChange = (qId, option) => {
    if (isSubmitted) return;
    setMcqAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleTfChange = (qId, statementKey, value) => {
    if (isSubmitted) return;
    setTfAnswers((prev) => ({
      ...prev,
      [qId]: { ...(prev[qId] || {}), [statementKey]: value },
    }));
  };

  const handleEssayChange = (qId, text) => {
    if (isSubmitted) return;
    setEssayAnswers((prev) => ({ ...prev, [qId]: text }));
  };

  const calculateScore = () => {
    let mcqScore = 0;
    quizData.mcq.forEach((q) => {
      if (mcqAnswers[q.id] === q.correct) {
        mcqScore += 0.25;
      }
    });

    let tfScore = 0;
    quizData.tf.forEach((q) => {
      const userAns = tfAnswers[q.id] || {};
      let correctCount = 0;
      ["a", "b", "c", "d"].forEach((key) => {
        if (userAns[key] === q.correct[key]) correctCount++;
      });
      if (correctCount === 1) tfScore += 0.1;
      else if (correctCount === 2) tfScore += 0.25;
      else if (correctCount === 3) tfScore += 0.5;
      else if (correctCount === 4) tfScore += 1.0;
    });

    const totalScore = mcqScore + tfScore;
    setScores({ mcq: mcqScore, tf: tfScore, total: totalScore });
    return { mcq: mcqScore, tf: tfScore, total: totalScore };
  };

  const handleSubmit = () => {
    if (!studentInfo.name.trim() || !studentInfo.class.trim()) {
      setShowConfirmModal("info_missing");
      return;
    }
    setShowConfirmModal("confirm");
  };

  const handleForceSubmit = () => {
    let finalName = studentInfo.name.trim() || "Không ghi tên (Hết giờ)";
    let finalClass = studentInfo.class.trim() || "Không rõ";
    setStudentInfo({ name: finalName, class: finalClass });
    executeSubmit(finalName, finalClass);
  };

  const confirmSubmit = () => {
    executeSubmit(studentInfo.name, studentInfo.class);
  };

  const executeSubmit = (submitName, submitClass) => {
    const currentScores = calculateScore();
    setShowConfirmModal(false);
    setIsSubmitted(true);
    setActiveTab("mcq");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Em có chắc chắn muốn xóa hết kết quả và làm lại từ đầu không?",
      )
    ) {
      setIsSubmitted(false);
      setMcqAnswers({});
      setTfAnswers({});
      setEssayAnswers({});
      setScores({ mcq: 0, tf: 0, total: 0 });
      setTimeLeft(45 * 60);
      setQuizData({
        mcq: shuffleArray(mcqDataOriginal),
        tf: shuffleArray(tfDataOriginal),
        essay: shuffleArray(essayDataOriginal),
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const preventCopyPaste = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white py-12 px-4 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-md">
            ÔN TẬP CUỐI KÌ 2 TIN HỌC 11
          </h1>
          <div className="h-1.5 w-24 bg-yellow-400 mx-auto rounded-full mb-4"></div>
          <p className="text-xl md:text-2xl font-bold text-blue-100 uppercase tracking-widest">
            TRƯỜNG THPT NA RÌ
          </p>
        </div>
      </div>

      {/* Header Sticky */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm relative border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex-1 w-full flex flex-col md:flex-row gap-3 items-center">
            {/* Input Tên */}
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 w-full md:w-auto focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <User className="text-blue-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Họ và Tên"
                disabled={isSubmitted}
                className="bg-transparent border-none outline-none text-sm font-semibold w-full md:w-48 disabled:text-gray-500"
                value={studentInfo.name}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, name: e.target.value })
                }
              />
            </div>
            {/* Input Lớp */}
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 w-full md:w-auto focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <BookOpen className="text-blue-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Lớp"
                disabled={isSubmitted}
                className="bg-transparent border-none outline-none text-sm font-semibold w-full md:w-24 disabled:text-gray-500"
                value={studentInfo.class}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, class: e.target.value })
                }
              />
            </div>

            {/* Tools */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap md:flex-nowrap">
              <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2.5 rounded-lg font-mono font-bold border border-amber-200 shadow-sm whitespace-nowrap flex-shrink-0">
                <Clock className="w-5 h-5" />
                <span>{formatTime(timeLeft)}</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitted}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-md transform transition-all active:scale-95 disabled:opacity-50 disabled:grayscale whitespace-nowrap flex-shrink-0"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Kết thúc bài làm</span>
              </button>

              {isSubmitted && (
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg transition-all shadow-md font-bold whitespace-nowrap flex-shrink-0"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Làm lại bài</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-6">
        {/* Results Banner */}
        {isSubmitted && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Đã nộp bài!
            </h2>
            <p className="text-green-700 mb-4">
              Học sinh: <span className="font-bold">{studentInfo.name}</span> -
              Lớp: <span className="font-bold">{studentInfo.class}</span>
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-green-100">
                <p className="text-sm text-gray-500 font-medium">Trắc nghiệm</p>
                <p className="text-xl font-bold text-blue-600">
                  {scores.mcq.toFixed(2)} điểm
                </p>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-green-100">
                <p className="text-sm text-gray-500 font-medium">Đúng / Sai</p>
                <p className="text-xl font-bold text-blue-600">
                  {scores.tf.toFixed(2)} điểm
                </p>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-green-100">
                <p className="text-sm text-gray-500 font-medium">
                  Tổng Trắc Nghiệm
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {scores.total.toFixed(2)} điểm
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4 italic">
              * Điểm tự luận sẽ được giáo viên chấm sau.
            </p>
          </div>
        )}

        {/* Tabs Premium */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 bg-gray-200/60 backdrop-blur-md p-2 rounded-2xl mb-8 shadow-inner border border-white/50 max-w-3xl mx-auto relative">
          <button
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all duration-300 ease-out w-full ${
              activeTab === "mcq"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/40 md:scale-[1.02] ring-1 ring-white/20 z-10"
                : "text-gray-500 hover:text-blue-700 hover:bg-white/80 hover:shadow-sm md:hover:scale-[1.01]"
            }`}
            onClick={() => setActiveTab("mcq")}
          >
            <ListChecks className="w-5 h-5 flex-shrink-0" />
            <span>Trắc nghiệm khách quan</span>
          </button>

          <button
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all duration-300 ease-out w-full ${
              activeTab === "tf"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/40 md:scale-[1.02] ring-1 ring-white/20 z-10"
                : "text-gray-500 hover:text-blue-700 hover:bg-white/80 hover:shadow-sm md:hover:scale-[1.01]"
            }`}
            onClick={() => setActiveTab("tf")}
          >
            <ToggleLeft className="w-5 h-5 flex-shrink-0" />
            <span>Trắc nghiệm Đúng/Sai</span>
          </button>

          <button
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all duration-300 ease-out w-full ${
              activeTab === "essay"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/40 md:scale-[1.02] ring-1 ring-white/20 z-10"
                : "text-gray-500 hover:text-blue-700 hover:bg-white/80 hover:shadow-sm md:hover:scale-[1.01]"
            }`}
            onClick={() => setActiveTab("essay")}
          >
            <Edit3 className="w-5 h-5 flex-shrink-0" />
            <span>Tự luận</span>
          </button>
        </div>

        {/* Tab Content: MCQ */}
        {activeTab === "mcq" && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800 mb-6">
              <strong>Hướng dẫn:</strong> Mỗi câu trả lời đúng được tính 0.25
              điểm. Chọn 1 đáp án đúng nhất. Cấu trúc câu hỏi và đáp án đã được
              đảo ngẫu nhiên.
            </div>
            {quizData.mcq.map((q, index) => (
              <div
                key={q.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="font-semibold text-base md:text-lg mb-4 flex flex-col md:flex-row gap-1 md:gap-2">
                  <span className="text-blue-600 whitespace-nowrap">
                    Câu {index + 1}:
                  </span>
                  <span className="text-gray-800 leading-relaxed">
                    {q.text}
                  </span>
                </h3>
                <div className="space-y-3 pl-4">
                  {Object.entries(q.options).map(([key, val]) => {
                    const isSelected = mcqAnswers[q.id] === key;
                    const isCorrect = q.correct === key;
                    let optionClass =
                      "flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ";
                    if (!isSubmitted) {
                      optionClass += isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50";
                    } else {
                      if (isCorrect)
                        optionClass += "border-green-500 bg-green-50";
                      else if (isSelected && !isCorrect)
                        optionClass += "border-red-500 bg-red-50";
                      else optionClass += "border-gray-200 opacity-60";
                    }
                    return (
                      <label key={key} className={optionClass}>
                        <input
                          type="radio"
                          name={`mcq-${q.id}`}
                          value={key}
                          checked={isSelected}
                          onChange={() => handleMcqChange(q.id, key)}
                          disabled={isSubmitted}
                          className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="font-medium flex-1">
                          <span className="font-bold mr-2">{key}.</span> {val}
                        </span>
                        {isSubmitted && isCorrect && (
                          <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                        )}
                        {isSubmitted && isSelected && !isCorrect && (
                          <XCircle className="text-red-500 w-5 h-5 flex-shrink-0" />
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: True/False */}
        {activeTab === "tf" && (
          <div className="space-y-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800 mb-6">
              <strong>Hướng dẫn:</strong> Mỗi câu có 4 ý (a, b, c, d). Điểm từng
              câu tính theo số ý trả lời đúng: 1 ý đúng = 0.1đ; 2 ý đúng =
              0.25đ; 3 ý đúng = 0.5đ; 4 ý đúng = 1.0đ.
            </div>
            {quizData.tf.map((q, index) => {
              const userAns = tfAnswers[q.id] || {};
              let correctCount = 0;
              let qPoints = 0;
              if (isSubmitted) {
                ["a", "b", "c", "d"].forEach((key) => {
                  if (userAns[key] === q.correct[key]) correctCount++;
                });
                if (correctCount === 1) qPoints = 0.1;
                else if (correctCount === 2) qPoints = 0.25;
                else if (correctCount === 3) qPoints = 0.5;
                else if (correctCount === 4) qPoints = 1.0;
              }
              return (
                <div
                  key={q.id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="font-semibold text-base md:text-lg flex flex-col md:flex-row gap-1 md:gap-2 w-full">
                      <span className="text-blue-600 whitespace-nowrap">
                        Câu {index + 1}:
                      </span>
                      <span className="text-gray-800 flex-1">{q.text}</span>
                    </h3>
                    {isSubmitted && (
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-bold text-sm whitespace-nowrap">
                        {qPoints.toFixed(2)} điểm ({correctCount}/4)
                      </div>
                    )}
                  </div>
                  <div className="space-y-4 pl-4 mt-6">
                    {Object.entries(q.statements).map(([key, statement]) => {
                      const ans = userAns[key];
                      const isCorrect = q.correct[key];
                      let rowClass =
                        "flex flex-col md:flex-row md:items-center gap-4 p-3 rounded-lg border ";
                      if (!isSubmitted) {
                        rowClass += ans
                          ? "border-blue-200 bg-blue-50/30"
                          : "border-gray-100 bg-gray-50/50";
                      } else {
                        if (ans === isCorrect)
                          rowClass += "border-green-500 bg-green-50";
                        else if (ans && ans !== isCorrect)
                          rowClass += "border-red-500 bg-red-50";
                        else rowClass += "border-red-500 bg-red-50";
                      }
                      return (
                        <div key={key} className={rowClass}>
                          <div className="flex-1 font-medium flex gap-2">
                            <span className="font-bold">{key})</span>
                            <span>{statement}</span>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <label
                              className={`flex items-center justify-center w-20 py-2 rounded border cursor-pointer transition-colors ${!isSubmitted ? (ans === "True" ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300 hover:bg-gray-100") : isCorrect === "True" ? "bg-green-600 text-white border-green-600" : ans === "True" ? "bg-red-600 text-white border-red-600" : "bg-gray-100 border-gray-300 text-gray-400"}`}
                            >
                              <input
                                type="radio"
                                name={`tf-${q.id}-${key}`}
                                className="hidden"
                                checked={ans === "True"}
                                onChange={() =>
                                  handleTfChange(q.id, key, "True")
                                }
                                disabled={isSubmitted}
                              />{" "}
                              Đúng
                            </label>
                            <label
                              className={`flex items-center justify-center w-20 py-2 rounded border cursor-pointer transition-colors ${!isSubmitted ? (ans === "False" ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300 hover:bg-gray-100") : isCorrect === "False" ? "bg-green-600 text-white border-green-600" : ans === "False" ? "bg-red-600 text-white border-red-600" : "bg-gray-100 border-gray-300 text-gray-400"}`}
                            >
                              <input
                                type="radio"
                                name={`tf-${q.id}-${key}`}
                                className="hidden"
                                checked={ans === "False"}
                                onChange={() =>
                                  handleTfChange(q.id, key, "False")
                                }
                                disabled={isSubmitted}
                              />{" "}
                              Sai
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab Content: Essay */}
        {activeTab === "essay" && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800 mb-6 flex gap-2 items-start">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Lưu ý:</strong> Học sinh tự gõ câu trả lời vào ô trống.
                Tính năng Sao chép (Copy) và Dán (Paste) đã bị vô hiệu hóa để
                đảm bảo tính tự giác.
              </div>
            </div>
            {quizData.essay.map((q, index) => (
              <div
                key={q.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="font-semibold text-base md:text-lg mb-4 flex flex-col md:flex-row gap-1 md:gap-2 w-full">
                  <span className="text-blue-600 whitespace-nowrap">
                    Câu {index + 1}:
                  </span>
                  <span className="text-gray-800 flex-1">{q.text}</span>
                </h3>
                <textarea
                  className={`w-full p-4 border rounded-lg resize-y focus:ring-2 outline-none transition-shadow min-h-[150px] ${isSubmitted ? "bg-gray-50 border-gray-200 text-gray-600" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"}`}
                  placeholder={
                    isSubmitted
                      ? "Bài làm đã được nộp."
                      : "Nhập câu trả lời của bạn tại đây..."
                  }
                  value={essayAnswers[q.id] || ""}
                  onChange={(e) => handleEssayChange(q.id, e.target.value)}
                  disabled={isSubmitted}
                  onCopy={preventCopyPaste}
                  onPaste={preventCopyPaste}
                  onCut={preventCopyPaste}
                  autoComplete="off"
                  spellCheck="false"
                ></textarea>
                {isSubmitted && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-bold text-yellow-800 text-sm mb-1">
                      Gợi ý đáp án:
                    </h4>
                    <p className="text-sm text-yellow-900 leading-relaxed">
                      {q.hint}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Xác Nhận */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
            {showConfirmModal === "info_missing" ? (
              <>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  Thiếu thông tin!
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Vui lòng điền đầy đủ Họ Tên và Lớp trước khi nộp bài.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold w-full"
                  >
                    Đã hiểu
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  Xác nhận nộp bài
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Bạn có chắc chắn muốn kết thúc bài làm và nộp bài không? Hành
                  động này không thể hoàn tác.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold flex-1"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={confirmSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex-1"
                  >
                    Nộp bài
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
