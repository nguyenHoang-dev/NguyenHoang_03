 
     let sanPhams = [
            { id: 1, ten: "Iphone 12", gia: 6000000, soLuong: 3 }
        ];

        function formatTien(gia) {
            return gia.toLocaleString('vi-VN') + "VNĐ";
        }

        function tinhTongGiaTri() {
            let tong = sanPhams.reduce((sum, sp) => sum + sp.gia * sp.soLuong, 0);
            document.getElementById("tongGiaTri").innerText = formatTien(tong);
            let datNhat = sanPhams.reduce((max, sp) => (max.gia > sp.gia ? max : sp), sanPhams[0]);
            document.getElementById("sanPhamDatNhat").innerText = `${datNhat.ten} (${formatTien(datNhat.gia)})`;
        }

        function hienThiSanPham() {
            let tbody = document.getElementById("sanPhamBody");
            tbody.innerHTML = "";
            sanPhams.forEach(sp => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${sp.id}</td>
                    <td>${sp.ten}</td>
                    <td>${formatTien(sp.gia)}</td>
                    <td>${sp.soLuong}</td>
                    <td>${formatTien(sp.gia * sp.soLuong)}</td>
                    <td>
                        <button class="edit" onclick="suaSanPham(this)">Sửa</button>
                        <button class="delete" onclick="xoaSanPham(this)">Xóa</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            tinhTongGiaTri();
        }

        function themSanPham() {
            let id = parseInt(document.getElementById("id").value);
            let ten = document.getElementById("ten").value;
            let gia = parseInt(document.getElementById("gia").value);
            let soLuong = parseInt(document.getElementById("soLuong").value);

            if (!id || !ten || !gia || !soLuong) {
                alert("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            if (sanPhams.some(sp => sp.id === id)) {
                hienThiThongBao(`ID ${id} đã tồn tại. Vui lòng chọn ID khác.`);
                return;
            }

            sanPhams.push({ id, ten, gia, soLuong });
            hienThiSanPham();
            document.getElementById("id").value = "";
            document.getElementById("ten").value = "";
            document.getElementById("gia").value = "";
            document.getElementById("soLuong").value = "";
        }

        function suaSanPham(button) {
            let row = button.parentElement.parentElement;
            let id = parseInt(row.cells[0].innerText);
            let sanPham = sanPhams.find(sp => sp.id === id);

            document.getElementById("id").value = sanPham.id;
            document.getElementById("ten").value = sanPham.ten;
            document.getElementById("gia").value = sanPham.gia;
            document.getElementById("soLuong").value = sanPham.soLuong;

            xoaSanPham(button);
        }

        function xoaSanPham(button) {
            let row = button.parentElement.parentElement;
            let id = parseInt(row.cells[0].innerText);
            sanPhams = sanPhams.filter(sp => sp.id !== id);
            hienThiSanPham();
        }

        function hienThiThongBao(noiDung) {
            let thongBao = document.getElementById("thongBao");
            document.getElementById("thongBaoNoiDung").innerText = noiDung;
            thongBao.style.display = "block";
        }

        function dongThongBao() {
            document.getElementById("thongBao").style.display = "none";
        }

        window.onload = function() {
            hienThiSanPham();
        };


    function timKiemSanPham() {
        let timkiem = parseInt(document.getElementById("timkiem").value);
        if (!timkiem) {
            hienThiThongBao("Vui lòng nhập mã sản phẩm để tìm kiếm!");
            hienThiSanPham();
            return;
        }

        let ketQua = sanPhams.filter(sp => sp.id === timkiem);
        if (ketQua.length === 0) {
            hienThiThongBao(`Không tìm thấy sản phẩm với ID ${searchId}`);
            document.getElementById("sanPhamBody").innerHTML = "";
            document.getElementById("tongGiaTri").innerText = "0 VNĐ";
            document.getElementById("sanPhamDatNhat").innerText = "Không có sản phẩm";
            return;
        }

        hienThiSanPham(ketQua);
    }