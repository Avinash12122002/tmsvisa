const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HERO */}
      <section
        className="
          relative
          overflow-hidden
          bg-[#071B4D]
          px-6
          pt-16
          pb-20
        "
      >
        {/* BACKGROUND */}
        <div
          className="
            absolute
            top-0
            right-0
            w-[400px]
            h-[400px]
            bg-blue-500/10
            blur-3xl
            rounded-full
          "
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              bg-white/10
              border
              border-white/10
              text-white
              px-4
              py-2
              rounded-full
              text-sm
              font-medium
              mb-7
            "
          >
            REFUND POLICY
          </div>

          {/* TITLE */}
          <h1
            className="
              text-white
              text-5xl
              md:text-6xl
              font-black
              leading-[1.1]
              tracking-tight
              max-w-4xl
            "
          >
            Refund &<span className="text-blue-400"> Cancellation Policy</span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              text-blue-100/80
              text-base
              leading-8
              max-w-3xl
              mt-5
            "
          >
            Please review our refund and cancellation terms carefully before
            placing any visa or immigration service request with TMS VISA.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        {/* TOP CARD */}
        <div
          className="
            bg-white
            shadow-[0_10px_30px_rgba(0,0,0,0.06)]
            rounded-[28px]
            p-8
            md:p-10
            border
            border-gray-100
          "
        >
          <div className="flex flex-col gap-10">
            {/* TOP CONTENT */}
            <div>
              <span
                className="
                  text-blue-600
                  font-semibold
                  text-xs
                  uppercase
                  tracking-widest
                "
              >
                TMS VISA POLICY
              </span>

              <h2
                className="
                  text-2xl
                  md:text-3xl
                  font-black
                  text-gray-900
                  mt-4
                  leading-tight
                  max-w-[700px]
                "
              >
                Refund & Cancellation Guidelines
              </h2>

              <p
                className="
                  mt-5
                  text-gray-600
                  leading-6
                  text-[15px]
                  max-w-[700px]
                "
              >
                TMS VISA follows transparent refund and cancellation procedures
                to ensure customers clearly understand all payment, refund, and
                cancellation conditions before application processing.
              </p>

              {/* TRUST LINE */}
              <div className="flex items-center gap-3 mt-5">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />

                <span className="text-sm text-gray-500">
                  Trusted by travelers worldwide
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* REFUND POLICY */}
        <div
          className="
            mt-10
            bg-white
            rounded-[28px]
            p-8
            md:p-10
            shadow-[0_10px_30px_rgba(0,0,0,0.04)]
            border
            border-gray-100
          "
        >
          <div className="max-w-5xl">
            <span
              className="
                text-blue-600
                font-semibold
                uppercase
                tracking-wider
                text-xs
              "
            >
              REFUND & CANCELLATION POLICY
            </span>

            <h2
              className="
                text-3xl
                font-black
                text-gray-900
                mt-4
                mb-10
              "
            >
              Refund and Cancellation Policy
            </h2>

            <div
              className="
                space-y-6
                text-gray-600
                text-[15px]
                leading-6
              "
            >
              {/* HOW TO CANCEL */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How to Cancel
                </h3>

                <div >
                  <p>
                    To request a cancellation, customers may contact TMS
                    Support through WhatsApp or email.
                  </p>

                  <p>
                    All cancellations are confirmed offline, and any applicable
                    refund will be credited to the original mode of payment
                    after deducting relevant charges.
                  </p>
                </div>
              </div>

              {/* CANCELLATIONS & REFUNDS */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Cancellations & Refunds
                </h3>

                <div >
                  <p>
                    Once TMS begins preliminary work on an order, and as
                    the application progresses towards submission, the
                    refundable amount reduces proportionately based on the
                    effort already invested by the team.
                  </p>

                  <p>
                    After the application has been submitted to the VFS centre,
                    Embassy, Consulate, or an online portal, cancellations are
                    no longer possible, and no refund can be issued.
                  </p>
                </div>
              </div>

              {/* VFS POLICY */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  VFS, Embassy & Outsourced Agency Appointment Policies
                </h3>

                <div >
                  <p>
                    For countries where administrative processes such as
                    biometric appointments or document submission are handled by
                    VFS Global or similar agencies, all appointment-related
                    rules shall follow the respective agency policies.
                  </p>

                  <p>
                    Any rescheduling fees, no-show charges, or administrative
                    deductions will be governed by the relevant agency’s
                    policies.
                  </p>

                  <p>
                    In the event of a no-show, TMS will assist customers in
                    securing a new appointment once the applicable rescheduling
                    fee is paid by the customer.
                  </p>

                  <p>
                    These charges may vary depending on the country, city, and
                    visa application centre.
                  </p>
                </div>
              </div>

              {/* VISA REJECTION */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Visa Rejection Policy
                </h3>

                <div >
                  <p>
                    In the event of a visa rejection, service fees are
                    non-refundable.
                  </p>

                  <p>
                    Embassy fees are refundable only if the embassy itself
                    issues a refund, which may vary depending on the country and
                    immigration authority.
                  </p>

                  <p>
                    If the customer has opted for Visa Rejection Insurance, the
                    claims process, eligibility, and required documentation are
                    governed by the respective VRI policy document.
                  </p>

                  <p>
                    In cases of proven operational error from TMS’s side,
                    the service fee may be reconsidered for a refund on a
                    case-by-case basis.
                  </p>
                </div>
              </div>

              {/* REFUND TIMELINE */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Refund Timeline
                </h3>

                <p>
                  Approved refunds are processed within 10–12 working days and
                  credited to the original mode of payment used during booking.
                </p>
              </div>

              {/* POLICY UPDATES */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Policy Updates
                </h3>

                <p>
                  TMS reserves the right to modify this Cancellation and
                  Refund Policy at any time without prior notice in order to
                  remain aligned with operational processes and external agency
                  guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="py-10 text-center text-gray-400 text-sm">
          © 2026 TMS VISA • Refund Policy • All Rights Reserved
        </div>
      </section>
    </div>
  );
};

export default RefundPolicyPage;
