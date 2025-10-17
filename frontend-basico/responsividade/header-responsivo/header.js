const toggleButton = document.getElementById("dropdown-toggle")
const dropdownContainer = document.getElementById("dropdown")

toggleButton.addEventListener("click", () => {
    const isHidden = dropdownContainer.classList.toggle("hidden")

    toggleButton.setAttribute("aria-expanded", !isHidden)
    toggleButton.setAttribute("aria-hidden", isHidden)
})



