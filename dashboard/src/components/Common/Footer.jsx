const Footer = () => {
  // Get current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <div class="container-fluid">
      <footer class="footer">
        <div class="row">
          <div class="col-md-12 footer-copyright text-center">
            <p class="mb-0">
              Copyright &copy;{currentYear}, Creatively designed by
              <a
                href="https://dhruvermafz.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dhruv Verma
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
