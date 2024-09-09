import React from 'react'
import addedClasses from '/addedClasses.png'
import pasteClassInput from '/pasteClassInput.png'
import highlightClasses from '/highlightClasses.png'
import generatedSchedules from '/generatedSchedules.png'
import weekSelection from '/weekSelection.png'
import updateSchedules from '/updateSchedules.png'
import courseInfos from '/courseInfos.png'

import { Divider, Image } from 'antd'

const Document = () => {
    return (
        <div className='container'>
            <article style={{
                // empty
            }}>
                <h1>Tài liệu</h1>
                <p>Chào mừng bạn đến với UlawTable - Công cụ hỗ trợ học tập cho sinh viên HCMULAW</p>
                <br />
                {/* <h2>Dịch thời khoá biểu</h2> */}

                <h3>Hướng dẫn</h3>
                <p>
                    <Divider orientation="left">Bước 1</Divider>
                    Bắt đầu bằng việc đánh dấu (bôi đen) bảng thời khoá biểu từ file Excel &nbsp;
                    <a
                        href='https://docs.google.com/spreadsheets/d/11iiDgp-S3mHYcaaLjEhpligyXsiWC22Ecf8BU523iNo/edit?usp=sharing'
                        style={{ color: 'blue' }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        (Lấy mẫu Excel)
                    </a> {" "}
                    <br />
                    và copy chúng vào clipboard của bạn bằng <code>Ctrl + C</code> trên Windows
                    hoặc <code>Command + C</code> trên MacOS.
                    <br />
                    <Image
                        width='100%'
                        src={highlightClasses}
                    />
                    <br />
                </p>
                <blockquote>
                    Chỉ copy phần nội dung quan trọng!
                    (Lớp học phần → Tuần học)
                </blockquote>

                <br />

                <p>
                    <Divider orientation="left">Bước 2</Divider>
                    Dán clipboard của bạn vào phần nhập bằng {" "}
                    <code>Ctrl + V</code> trên Windows hoặc <code>Command + V</code> trên MacOS
                    <br />
                    <Image
                        width='100%'
                        src={pasteClassInput}
                    />
                    <br />
                </p>

                <blockquote>
                    Ô nhập dữ liệu có thể trông khá lạ, đừng để ý
                </blockquote>

                <br />

                <p>
                    <Divider orientation="left">Bước 3</Divider>
                    Bấm vào thêm môn, bạn sẽ nhận được thông báo đã thêm môn thành công
                    <br />
                    <Image
                        width='100%'
                        src={addedClasses}
                    />

                    <br />
                </p>

                <br />
                <p>
                    Sau đó bạn sẽ được cung cấp một bảng các khóa học đã thêm.
                    <br />
                    <Image
                        width='100%'
                        src={generatedSchedules}
                    />
                    <br />
                </p>
                <blockquote>
                    Tuần học được đánh dấu màu đen
                </blockquote>

                <br />

                <p>
                    <Divider orientation="left">Bước 4</Divider>
                    Sau khi đã thêm môn, bấm vào "Cập nhật thời khoá biểu" để thêm môn vào thời khoá biểu
                    <br />
                    <Image
                        width='100%'
                        src={updateSchedules}
                    />
                    <br />
                </p>

                <br />

                <p>
                    <Divider orientation="left">Bước 5</Divider>
                    Chọn tuần học từ 1 → 22
                    <br />
                    <Image
                        width='100%'
                        src={weekSelection}
                    />
                    <br />
                </p>

                <blockquote>
                    Lưu ý: phải "Cập nhật thời khoá biểu" thì môn học mới xuất hiện
                </blockquote>

                <br />

                <p>
                    <br />
                    <Image
                        width='100%'
                        src={courseInfos}
                    />
                    <br />
                </p>

                <blockquote>
                    Thông tin sẽ được hiện thị khi đưa chuột vào môn học
                </blockquote>

            </article>
        </div>
    )
}

export default Document