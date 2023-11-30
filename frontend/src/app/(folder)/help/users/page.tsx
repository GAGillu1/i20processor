import { UsersIcon } from "@/assets/myIcons";
import { HelperCard, usersDesc } from "@/components/utils/myCards";
import Image from "next/image";
import addUserImage from "@/public/addUser.png";
import addSignImage from "@/public/addSign.png";

const Page = () => {
  return (
    <main className="w-[95%] mx-auto">
      <HelperCard link="/i20/users" title="Users" description={usersDesc}>
        <UsersIcon className="w-16 h-16 text-indigo-900 mx-auto" />
        <div>
          <Image
            src={addUserImage}
            objectFit="contain"
            alt="Add User Screenshot"
            className="rounded w-full"
          />
          <Image
            src={addSignImage}
            objectFit="contain"
            alt="Add Sign Screenshot"
            className="rounded w-full my-2"
          />
        </div>
        <ul>
          <li>
            <li className="font-semibold">Add User:</li>
            <ol className="list-decimal list-inside pl-4">
              <li>
                Enter Display name (Name to be displayed in I20Processor).
              </li>
              <li>Fill in the Full name of the Employee.</li>
              <li>Enter Email Address.</li>
              <li>Select corresponding Role for the User.</li>
              <li>Click on Register button to create an account.</li>
            </ol>
          </li>
          <li>
            <li className="font-semibold">View User:</li>
            <ol className="list-decimal list-inside pl-4">
              <li>Click on a user to view his details.</li>
              <li>To activate/deactivate, use toggle.</li>
              <li>Click on the edit button to change details of the user.</li>
              <li>We can change Display Name, Full Name, and Roles only.</li>
              <li>Click on add signature to add.</li>
              <li>Select X - Coordinate.</li>
              <li>Select Y - Coordinate.</li>
              <li>Enter Valid Length.</li>
              <li>Input Correct Width.</li>
              <li>Choose a Valid signature file to be added.</li>
              <li>Select Action i.e., Either Test or Upload.</li>
              <li>Finally, Click on Add Signature.</li>
              <li>Now click on save to persist the data.</li>
            </ol>
          </li>
          <li>
            Edit User Details and Roles:
            <ul>
              <li>
                Modify user information such as Display Name, Full Name, Email
                Address, and Role assignments.
              </li>
            </ul>
          </li>
          <li>
            Add Signature:
            <ul>
              <li>
                Administrators, and the respective user, have the privilege to
                incorporate digital signatures.
              </li>
              <li className="italic">
                <span className="not-italic">Note:</span> The addition of Super
                User is restricted to developers or product owners, and
                organizational administrators possess full access control over
                their user management tasks.
              </li>
            </ul>
          </li>
        </ul>
      </HelperCard>
    </main>
  );
};

export default Page;
