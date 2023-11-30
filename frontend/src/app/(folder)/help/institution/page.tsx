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
          <Image
            src={addInstitutionImage}
            objectFit="contain"
            alt="Add Instance Screenshot"
            className="rounded w-full"
          />
          <Image
            src={institutionInfoImage}
            objectFit="contain"
            alt="Instance Info Screenshot"
            className="rounded w-full my-2"
          />
        </div>
        <ol className="list-decimal list-inside ">
          <li>
            Add Institution:
            <ul>
              <li>
                This feature necessitates the input of various details:
                <ol className="ml-4 list-decimal list-inside">
                  <li>Institution Name</li>
                  <li>
                    CRM (Customer Relationship Management) module associated
                    with the institution.
                  </li>
                  <li>
                    Primary Contact Information, including Full Name, Display
                    Name, Email ID, and Contact Number.
                  </li>
                </ol>
              </li>
            </ul>
          </li>
          <li>
            Additional Features:
            <ul>
              <li>Institution User List:</li>
              <ol className="ml-8">
                <li>
                  Displays a list of users affiliated with the specific
                  organization.
                </li>
              </ol>
              <li>Institution Logs:</li>
              <ol>
                <li>
                  Provides a comprehensive log of all activities associated with
                  this organization.
                </li>
              </ol>
            </ul>
          </li>
        </ol>
      </HelperCard>
    </main>
  );
};

export default Page;
