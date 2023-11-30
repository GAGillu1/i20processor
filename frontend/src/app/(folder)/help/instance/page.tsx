/* eslint-disable react/no-unescaped-entities */
import { UsersIcon } from "@/assets/myIcons";
import {
  HelperCard,
  instanceDesc,
  usersDesc,
} from "@/components/utils/myCards";
import Image from "next/image";
import addInstanceImage from "@/public/addInstance.png";
import instanceInfoImage from "@/public/instanceInfo.png";

const Page = () => {
  return (
    <main className="w-[95%] mx-auto">
      <HelperCard title="Instance" description={instanceDesc}>
        <UsersIcon className="w-16 h-16 text-indigo-900 mx-auto" />
        <div className="">
          <Image
            src={addInstanceImage}
            objectFit="contain"
            alt="Add Instance Screenshot"
            className="rounded w-full"
          />
          <Image
            src={instanceInfoImage}
            objectFit="contain"
            alt="Instance Info Screenshot"
            className="rounded w-full my-2"
          />
        </div>
        <ol className="list-decimal list-inside ">
          <li>
            Add Instance
            <ul>
              <li>
                To introduce a new CRM instance, users must input specific
                details, including Instance Name, Username, Password, JSON
                Endpoint, and Processor Type (pre-processor or post-processor).
                Subsequently, users can choose to test the instance, ensuring
                the accuracy of the provided details, or register it,
                effectively creating a new instance within the portal.
              </li>
            </ul>
          </li>
          <li>
            Filter Instance:
            <ul>
              <li>
                The "Filter Instance" option enables users to streamline their
                view by selecting either pre-processor or post-processor. This
                facilitates a focused display of all instances corresponding to
                the chosen filter value.
              </li>
            </ul>
          </li>
          <li>
            Edit Instance:
            <ul>
              <li>
                Within the available instances, users can select and edit any
                instance by modifying the values initially entered during the
                addition of the instance. Post-editing, users can save the
                updated values, ensuring accurate and up-to-date instance
                information.
              </li>
              <li>
                These functionalities contribute to an organized and
                user-friendly interface, enhancing the efficiency of managing
                and maintaining instances within the portal.
              </li>
            </ul>
          </li>
        </ol>
      </HelperCard>
    </main>
  );
};

export default Page;
