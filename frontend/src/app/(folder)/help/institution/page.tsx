"use client";

/* eslint-disable react/no-unescaped-entities */
import { UsersIcon } from "@/assets/myIcons";
import { HelperCard, institutionDesc } from "@/components/utils/myCards";
import Image from "next/image";
import addInstitutionImage from "@/public/addInstitution.png";
import institutionInfoImage from "@/public/institutionInfo.png";
// Institution Module
// The Institution module provides an overview of all institutions registered on the portal. Users can perform the following actions within this module:
// *       Add Institution:
//         * This feature necessitates the input of various details:
//         * Institution Name
//         * CRM (Customer Relationship Management) module associated with the institution.
//         * Primary Contact Information, including Full Name, Display Name, Email ID, and Contact Number.
// *       Additional Features:
//         * Institution User List:
//         * Displays a list of users affiliated with the specific organization.
//         * Institution Logs:
//         * Provides a comprehensive log of all activities associated with this organization.
// *       Edit Functionality:
//     * Accessible only to the Institute Admin or Super User, the Edit button allows modifications to any of the institution's details.
// The Institution module ensures efficient management and organization of institutional information, enhancing user control and accessibility.
const Page = () => {
  return (
    <main className="w-[95%] mx-auto">
      <HelperCard
        link="/i20/users"
        title="Institution"
        description={institutionDesc}
      >
        <UsersIcon className="w-16 h-16 text-indigo-900 mx-auto" />
        <div className="">
          <div className="">
            <Image
              src={addInstitutionImage}
              alt="Add Instance Screenshot"
              className="rounded hover:scale-150 duration-300 hover:translate-x-28 hover:-translate-y-6"
            />
          </div>
          <div className="">
            <Image
              src={institutionInfoImage}
              alt="Instance Info Screenshot"
              className="rounded ml-2 hover:scale-150 duration-300 hover:-translate-x-28 hover:-translate-y-7"
            />
          </div>
        </div>
        <ul>
          <li>
            Add Institution:
            <ol className="list-decimal list-inside ">
              <li>Enter Institution Name.</li>
              <li>Fill in CRM value.</li>
              <li>
                Primary contact details start with Full Name; please enter
                accordingly.
              </li>
              <li>Populate Display Name.</li>
              <li>Enter Email Address.</li>
              <li>Enter contact Number.</li>
              <li>Click on the add button to create a new Institution.</li>
            </ol>
          </li>
          <li>
            View Institution:
            <ol>
              <li>Search bar to search for a particular institution.</li>
              <li>Click on any institution.</li>
              <li>
                Institution Info will be available on the screen with three
                buttons.
              </li>
              <li>
                <ol>
                  <li>
                    Institution User List: Click to view users who come under
                    this particular institution.
                  </li>
                  <li>
                    Institution Logs: Click to view logs only particular to this
                    institution.
                  </li>
                  <li>
                    Edit button: Click to edit all values mentioned in Add New
                    Institution.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
        </ul>
      </HelperCard>
    </main>
  );
};

export default Page;
