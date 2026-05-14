// ==========================================
// ĐOẠN DỮ LIỆU GỐC (DATABASE MÔ PHỎNG)
// ==========================================
    const mangaData = [
    {
        title: "One Piece",
        image: "img/onepiece.jpg",
        author:"Oda Eiichiro",
        year: "1997",
        genre: ["Shonen"],
        status: "Đang tiến hành",
        rating: 9,
        summary: "Một hành trình tuyệt vời về tình bạn và sự tự do. Câu chuyện theo chân Monkey D. Luffy cùng các đồng đội trong băng hải tặc Mũ Rơm khám phá đại dương, tìm kiếm kho báu huyền thoại One Piece. Thế giới trong truyện được xây dựng cực kỳ đồ sộ, các tình tiết cài cắm (foreshadowing) đỉnh cao, mang lại nhiều cảm xúc từ hài hước đến cảm động sâu sắc."
    },
    {
        title: "KonoSuba: Gods Blessing on this Wonderful World!",
        image: "img/konosuba.jpg",
        author: "Natsume Akatsuki",
        year: "2013",
        genre: ["Adventure", "Action", "Comedy"],
        status: "Đang tiến hành",
        rating: 9.37
    },
    {
        title: "Grand Blue",
        image: "img/grandblue.jpg",
        author: "Kenji Inoue",
        year: "2014",
        genre: ["Comedy"],
        status: "Đang tiến hành",
        rating: 8.75
    }
];

// Biến toàn cục để lưu trạng thái thể loại đang chọn (mặc định là hiển thị 'all')
let currentGenre = "all";

// ==========================================
// ĐÁP ỨNG TIÊU CHÍ: 05 HÀM TỰ ĐỊNH NGHĨA
// ==========================================

// --- HÀM 1: Hiển thị danh sách truyện (Bấm vào sẽ mở to chi tiết) ---
// --- HÀM 1: Hiển thị danh sách truyện (Bấm vào sẽ sang mục khác) ---
function renderReviews(mangasToDisplay) {
    const container = document.getElementById("manga-container");
    container.innerHTML = ""; 

    if (mangasToDisplay.length === 0) {
        container.innerHTML = `<p class="text-center text-gray-400 my-8 text-sm">Không tìm thấy truyện nào phù hợp...</p>`;
        return;
    }

    mangasToDisplay.forEach(manga => {
        const card = document.createElement("article");
        card.className = "bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-200 flex flex-col sm:flex-row gap-5 items-start cursor-pointer";
        
        // SỰ KIỆN: Khi bấm vào chiếc card, kích hoạt hàm chuyển mục
        card.addEventListener("click", () => goToMangaDetail(manga));

        card.innerHTML = `
            <div class="w-28 h-36 flex-shrink-0 mx-auto sm:mx-0 overflow-hidden rounded-lg shadow-inner bg-gray-50 border border-gray-100">
                <img src="${manga.image}" alt="${manga.title}" class="w-full h-full object-cover">
            </div>
            
            <div class="flex-grow space-y-1.5 text-sm w-full">
                <div class="flex justify-between items-start gap-4 mb-1">
                    <h2 class="text-xl font-black tracking-tight text-gray-950">${manga.title}</h2>
                    <div class="flex-shrink-0 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl text-center min-w-[80px]">
                        <div class="flex items-center justify-center font-black text-amber-600 text-base">
                            <span>${manga.rating}</span>
                            <span class="text-amber-500/80 font-bold ml-0.5">/10</span>
                        </div>
                        <span class="text-[9px] text-amber-400 block font-bold tracking-wider -mt-0.5">⭐ RATE</span>
                    </div>
                </div>
                
                <ul class="space-y-1 text-gray-700 font-normal">
                    <li><span class="text-gray-400 font-medium">🔹 Tác giả:</span> ${manga.author}</li>
                    <li><span class="text-gray-400 font-medium">📅 Xuất bản:</span> Năm ${manga.year}</li>
                    <li>
                        <span class="text-gray-400 font-medium">🏷️ Thể loại:</span> 
                        <div class="inline-flex flex-wrap gap-1">
                            ${manga.genre.map(g => `<span class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">${g}</span>`).join('')}
                        </div>
                    </li>
                    <li><span class="text-gray-400 font-medium">📌 Tình trạng:</span> <span class="text-amber-600 font-medium">${manga.status}</span></li>
                </ul>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// --- HÀM 2: Hàm chuyển mục và đổ dữ liệu sang mục Chi Tiết Truyện ---
function goToMangaDetail(manga) {
    const mainPage = document.getElementById("main-page");
    const detailPage = document.getElementById("detail-page");
    const detailContent = document.getElementById("detail-content");

    // Đổ dữ liệu chi tiết vào mục 2
    detailContent.innerHTML = `
        <div class="flex flex-col sm:flex-row gap-6 items-start pb-6 border-b border-gray-100">
            <div class="w-36 h-48 flex-shrink-0 mx-auto sm:mx-0 overflow-hidden rounded-xl shadow-md border border-gray-100">
                <img src="${manga.image}" alt="${manga.title}" class="w-full h-full object-cover">
            </div>
            
            <div class="space-y-2.5 w-full text-sm">
                <h3 class="text-2xl font-black text-gray-950 leading-tight">${manga.title}</h3>
                
                <div class="flex items-center gap-1.5 text-amber-600 font-black text-lg pt-1">
                    <span>⭐ ${manga.rating}</span><span class="text-xs text-gray-400 font-bold">/10 ĐIỂM</span>
                </div>

                <p><span class="text-gray-400 font-medium">🔹 Tác giả:</span> <strong class="text-gray-700 font-semibold">${manga.author}</strong></p>
                <p><span class="text-gray-400 font-medium">📅 Năm xuất bản:</span> <span class="text-gray-700">${manga.year}</span></p>
                <p><span class="text-gray-400 font-medium">📌 Tình trạng:</span> <span class="text-amber-600 font-semibold">${manga.status}</span></p>
                <div class="pt-1">
                    <span class="text-gray-400 font-medium block mb-1">🏷️ Thể loại truyện:</span>
                    <div class="flex flex-wrap gap-1.5">
                        ${manga.genre.map(g => `<span class="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-0.5 rounded-md text-xs font-medium">${g}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>

        <div class="pt-6 space-y-3">
            <h4 class="text-base font-black text-gray-900 flex items-center gap-2">
                <span class="w-1.5 h-4 bg-amber-500 rounded-full"></span> Nội dung & Đánh giá chi tiết
            </h4>
            <p class="text-gray-600 text-[15px] leading-relaxed font-normal whitespace-pre-line bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-inner">
                ${manga.summary}
            </p>
        </div>
    `;

    // Ẩn trang danh sách (Mục 1) và hiện trang chi tiết (Mục 2)
    mainPage.classList.add("hidden");
    detailPage.classList.remove("hidden");
    
    // Tự động cuộn màn hình lên đầu trang cho dễ đọc
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- LẮNG NGHE SỰ KIỆN NÚT QUAY LẠI ---
document.addEventListener("DOMContentLoaded", () => {
    const backBtn = document.getElementById("back-to-list-btn");
    const mainPage = document.getElementById("main-page");
    const detailPage = document.getElementById("detail-page");

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            // Ngược lại: Ẩn trang chi tiết, hiện lại trang danh sách
            detailPage.classList.add("hidden");
            mainPage.classList.remove("hidden");
        });
    }
});
// --- HÀM 2: Lọc dữ liệu tổng hợp dựa trên cả Thể loại và Thanh tìm kiếm ---
function filterData() {
    const searchKey = document.getElementById("search-input").value.toLowerCase().trim();
    
    const filtered = mangaData.filter(manga => {
        const matchesSearch = manga.title.toLowerCase().includes(searchKey);
        
        if (currentGenre === "all") {
            return matchesSearch;
        } else {
            // Kiểm tra xem mảng thể loại của truyện có chứa thể loại đang lọc không
            return matchesSearch && manga.genre.includes(currentGenre);
        }
    });

    renderReviews(filtered);
}



// --- HÀM 4: Cài đặt sự kiện cho ô Nhập liệu tìm kiếm (Tương tác DOM) ---
function setupSearchEvent() {
    const searchInput = document.getElementById("search-input");
    // Lắng nghe sự kiện 'input' (mỗi khi người dùng gõ phím, trang tự động cập nhật ngay)
    searchInput.addEventListener("input", filterData);
}

// --- HÀM 5: Reset toàn bộ bộ lọc quay về trạng thái ban đầu khi bấm vào Logo ---
function resetToAll() {
    document.getElementById("search-input").value = ""; // Xóa chữ trong ô tìm kiếm
    currentGenre = "all"; // Đặt lại thể loại về tất cả
    renderReviews(mangaData); // Đổ lại toàn bộ dữ liệu ban đầu
}

// ==========================================
// KHỞI CHẠY ỨNG DỤNG LẦN ĐẦU KHI LOAD TRANG
// ==========================================
renderReviews(mangaData);    // Hiển thị danh sách truyện ban đầu
setupSearchEvent();         // Kích hoạt tính năng gõ chữ tìm kiếm

// --- HÀM BỔ SUNG: Lắng nghe sự kiện click từ bảng thể loại thả xuống (Dropdown) ---
function setupDropdownEvents() {
    const dropdownButtons = document.querySelectorAll(".menu-genre-btn");
    
    dropdownButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            // Lấy tên thể loại được gắn ở thuộc tính data-genre
            const selectedGenre = this.getAttribute("data-genre");
            
            // Cập nhật biến thể loại toàn cục và tiến hành lọc dữ liệu
            currentGenre = selectedGenre;
            filterData();
            
            // Cuộn trang xuống mượt mà để người dùng nhìn thấy kết quả ngay
            window.scrollTo({ top: 150, behavior: 'smooth' });
        });
    });
}

// Gọi kích hoạt hàm này cùng với các hàm khởi chạy ban đầu ở cuối file script.js
setupDropdownEvents();