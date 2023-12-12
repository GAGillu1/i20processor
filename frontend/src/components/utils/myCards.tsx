import {
  AddInstanceIcon,
  AddUserIcon,
  AdminIcon,
  ChangePwdIcon,
  DsoIcon,
  I20Icon,
  InstanceIcon,
  LogsIcon,
  PostProcessingIcon,
  PreProcessingIcon,
  UniversityIcon,
  UsersIcon,
} from "@/assets/myIcons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { AnimationVariants } from "./variants";

// -------------------------------
// CARD
export const Card = ({ ...props }) => {
  return (
    <motion.div variants={AnimationVariants.card}>
      <Link href={props.href}>
        <div className="bg-white rounded-lg w-40 h-40 hover:scale-105 duration-300 transform group">
          <div className="bg-indigo-50 rounded-t-lg h-28 w-full items-center flex">
            {props.children}
          </div>
          <div className="flex items-center justify-center h-12">
            <h3 className="font-semibold text-lg ">{props.title}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
// -------------------------------
// LARGE CARD
export const CardLg = ({ ...props }) => {
  return (
    <motion.div variants={AnimationVariants.card}>
      <Link href={props.link}>
        <div className="grid grid-cols-6 rounded-lg hover:scale-105 duration-300">
          <div className="bg-indigo-50 rounded-l-lg flex items-center justify-center">
            {props.children}
          </div>
          <div className="col-span-5 bg-white rounded-r-lg py-2 px-4">
            <h3 className="text-indigo-900 ">{props.title} </h3>
            <p className=" text-justify py-1">{props.description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
// -------------------------------
// HELPER CARD
export const HelperCard = ({ ...props }) => {
  const [icon, image, instructions] = props.children;
  return (
    <section className="grid grid-cols-5 rounded-lg bg-white  text-justify">
      <div className="bg-indigo-50 rounded-tl-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="col-span-4 rounded-r-lg px-4 py-2 border-b-2 border-indigo-50">
        <h3 className="text-indigo-900">{props.title}</h3>
        <p className="py-1">{props.description}</p>
      </div>
      <div className="col-span-3 p-2">{image}</div>
      <div className="col-span-2 p-2">
        <h2 className="p-0">Instructions</h2>
        <div className="px-2">{instructions}</div>
      </div>
    </section>
  );
};
// -------------------------------
// ADD USER CARD
export const AddUserCard = () => {
  return (
    <Card href="/admin/users" title="Add User">
      <AddUserIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </Card>
  );
};
// -------------------------------
// I20 CARD
export const I20Card = () => {
  return (
    <Card href="/i20" title="I20">
      <I20Icon className="w-16 h-16 text-indigo-900 mx-auto" />
    </Card>
  );
};
// -------------------------------
// ADMIN CARD
export const AdminCard = () => {
  return (
    <Card href="/admin" title="Admin">
      <AdminIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </Card>
  );
};
// -------------------------------
// DSO CARD
export const DsoCard = () => {
  return (
    <Card href="/dso" title="DSO">
      <DsoIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </Card>
  );
};
// -------------------------------
// USERS CARD
export const UsersCard = () => {
  return (
    <Card href="/admin/users" title="Users">
      <UsersIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </Card>
  );
};
// -------------------------------
// INSTANCE CARD
export const InstanceCard = () => {
  return (
    <Card href="/admin/instance" title="Instance">
      <InstanceIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </Card>
  );
};
// -------------------------------
// ADD INSTANCE CARD
export const AddInstanceCard = () => {
  return (
    <Card href="/admin/instance?addInstance=true" title="Add Instance">
      <AddInstanceIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </Card>
  );
};
// -------------------------------
// PRE-PROCESSOR CARD
export const PreProcessingCard = () => {
  return (
    <Card href="/i20/pre-processor" title="Pre-processor">
      <PreProcessingIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </Card>
  );
};
// -------------------------------
// POST-PROCESSOR CARD
export const PostProcessingCard = () => {
  return (
    <Card href="/i20/post-processor" title="Post-processor">
      <PostProcessingIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </Card>
  );
};
// -------------------------------
// LOGS CARD
export const LogsCard = () => {
  return (
    <Card href="/logs" title="Logs">
      <LogsIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </Card>
  );
};
// -------------------------------
// CHANGE PASSWORD CARD
export const ChangePasswordCard = () => {
  return (
    <Card href="/profile" title="Change Password">
      <ChangePwdIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </Card>
  );
};
// -------------------------------
// UNIVERSITY CARD
export const InstitutionCard = () => {
  return (
    <Card href="/admin/institution" title="Institution">
      <UniversityIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </Card>
  );
};
// -------------------------------
// LARGE CARDS
// -------------------------------
// USERS CARD
export const UsersCardLg = () => {
  const path = usePathname();

  return (
    <CardLg link={`${path}/users`} title="Users" description={usersDesc}>
      <UsersIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </CardLg>
  );
};

// -------------------------------
// INSTANCE CARD
export const InstanceCardLg = () => {
  const path = usePathname();

  return (
    <CardLg
      link={`${path}/instance`}
      title="Instance"
      description={instanceDesc}
    >
      <InstanceIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </CardLg>
  );
};
// -------------------------------
// INSTITUTION CARD
export const InstitutionCardLg = () => {
  const path = usePathname();
  return (
    <CardLg
      link={`${path}/institution`}
      title="Institution"
      description={institutionDesc}
    >
      <UniversityIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </CardLg>
  );
};

// -------------------------------
// PRE-PROCESSOR CARD
export const PreProcessorCardLg = () => {
  const path = usePathname();

  return (
    <CardLg
      link={`${path}/pre-processor`}
      title="Pre-processor"
      description={preProcessorDesc}
    >
      <PreProcessingIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </CardLg>
  );
};
// -------------------------------
// POST-PROCESSOR CARD
export const PostProcessingCardLg = () => {
  const path = usePathname();

  return (
    <CardLg
      link={`${path}/post-processor`}
      title="Post-processor"
      description={postProcessorDesc}
    >
      <PostProcessingIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </CardLg>
  );
};
// -------------------------------
// CARD DESCRIPTIONS
export const preProcessorDesc =
  "The Pre-Processing stage encompasses a series of essential tasks that must be executed prior to the principal processing of the i20 instance. This tool is designed to streamline the i20 process for each student by automatically populating all requisite fields. This ensures a seamless and efficient workflow, thereby enhancing the overall productivity of the process.";
export const postProcessorDesc =
  "The Post-Processing stage is a critical phase that entails the division of the batch file and the allocation of documents to the corresponding students within the institution. This tool is engineered to automate these tasks, thereby ensuring a smooth and efficient distribution process. This not only enhances the operational workflow but also ensures accuracy and consistency in document assignment. ";

export const institutionDesc =
  "The Institution field likely refers to the educational institution or organization involved in the i20 process. This could encompass the school, college, or university that is tasked with the issuance of i20 documents. This field serves as a crucial identifier, linking each i20 document to its respective issuing authority.";
export const instanceDesc =
  "The Instance operates as a centralized nexus or repository where all instances and endpoints are meticulously configured. This system is fully customizable, offering the flexibility to tailor its functionalities according to the unique requirements of each client. This adaptability ensures that the system can effectively cater to a diverse range of operational needs, thereby enhancing its utility and efficiency.";
export const usersDesc =
  "The Users window is designed for entries related to individuals or entities that interact with the i20 system. This could encompass administrators, students, or other stakeholders who play a role in the i20 process. This field serves as a key identifier, facilitating the tracking and management of user interactions within the system.";
