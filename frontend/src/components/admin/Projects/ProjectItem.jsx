import React from "react";

const ProjectItem = () => {
  return (
    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="card mb-6">
        <div class="card-widget-separator-wrapper">
          <div class="card-body card-widget-separator">
            <div class="row gy-4 gy-sm-1">
              <div class="col-sm-6 col-lg-3">
                <div class="d-flex justify-content-between align-items-center card-widget-1 border-end pb-4 pb-sm-0">
                  <div>
                    <h4 class="mb-0">24</h4>
                    <p class="mb-0">Clients</p>
                  </div>
                  <div class="avatar me-sm-6">
                    <span class="avatar-initial rounded bg-label-secondary text-heading">
                      <i class="ti ti-user ti-26px"></i>
                    </span>
                  </div>
                </div>
                <hr class="d-none d-sm-block d-lg-none me-6" />
              </div>
              <div class="col-sm-6 col-lg-3">
                <div class="d-flex justify-content-between align-items-center card-widget-2 border-end pb-4 pb-sm-0">
                  <div>
                    <h4 class="mb-0">165</h4>
                    <p class="mb-0">Invoices</p>
                  </div>
                  <div class="avatar me-lg-6">
                    <span class="avatar-initial rounded bg-label-secondary text-heading">
                      <i class="ti ti-file-invoice ti-26px"></i>
                    </span>
                  </div>
                </div>
                <hr class="d-none d-sm-block d-lg-none" />
              </div>
              <div class="col-sm-6 col-lg-3">
                <div class="d-flex justify-content-between align-items-center border-end pb-4 pb-sm-0 card-widget-3">
                  <div>
                    <h4 class="mb-0">$2.46k</h4>
                    <p class="mb-0">Paid</p>
                  </div>
                  <div class="avatar me-sm-6">
                    <span class="avatar-initial rounded bg-label-secondary text-heading">
                      <i class="ti ti-checks ti-26px"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-lg-3">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 class="mb-0">$876</h4>
                    <p class="mb-0">Unpaid</p>
                  </div>
                  <div class="avatar">
                    <span class="avatar-initial rounded bg-label-secondary text-heading">
                      <i class="ti ti-circle-off ti-26px"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-datatable table-responsive">
          <table class="invoice-list-table table border-top">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>#</th>
                <th>Status</th>
                <th>Client</th>
                <th>Total</th>
                <th class="text-truncate">Issued Date</th>
                <th>Balance</th>
                <th>Invoice Status</th>
                <th class="cell-fit">Action</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
