const bellBtn = document.getElementById("bellBtn");
const dropdown = document.getElementById("dropdown");
const badge = document.getElementById("badge");
const markReadBtn = document.getElementById("markRead");
const notificationsList = document.getElementById("notificationsList");
const notifications = notificationsList.querySelectorAll(".notification-item");

bellBtn.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

markReadBtn.addEventListener("click", () => {
  const unreadItems = notificationsList.querySelectorAll(".unread");
  unreadItems.forEach((item) => item.classList.remove("unread"));

  updateBadge();
});

function updateBadge() {
  const unreadCount = notificationsList.querySelectorAll(".unread").length;

  if (unreadCount > 0) {
    badge.textContent = unreadCount;
    badge.style.display = "block";
  } else {
    badge.style.display = "none";
  }
}

notifications.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("unread")) {
      item.classList.remove("unread");
      updateBadge();
    }
  });
});

document.addEventListener("click", (e) => {
  const wrapper = document.querySelector(".notification-wrapper");

  if (!wrapper.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});

updateBadge();
