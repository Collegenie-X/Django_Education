document.addEventListener("DOMContentLoaded", function () {
  // 모든 제출 버튼을 선택합니다.
  const saveButtons = document.querySelectorAll('button[type="submit"]');

  // 각 버튼에 클릭 이벤트 리스너를 추가합니다.
  saveButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 버튼을 비활성화하고 로딩 상태로 변경합니다.
      button.disabled = true;
      button.innerHTML = "Saving..."; // 버튼 텍스트를 'Saving...'으로 변경
      button.form.submit(); // 폼을 제출합니다.
    });
  });
});
