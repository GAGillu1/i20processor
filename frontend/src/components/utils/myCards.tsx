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
// -------------------------------
// CARD
export const Card = ({ ...props }) => {
  return (
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
  );
};
// -------------------------------
// LARGE CARD
export const CardLg = ({ ...props }) => {
  return (
    <Link href={props.link}>
      <section className="grid grid-cols-6 rounded-lg hover:scale-105 duration-300">
        <div className="bg-indigo-50 rounded-l-lg flex items-center justify-center">
          {props.children}
        </div>
        <div className="col-span-5 bg-white rounded-r-lg p-2">
          <h3 className="text-indigo-900">{props.title} </h3>
          <p className="pt-2">{props.description}</p>
        </div>
      </section>
    </Link>
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
  return (
    <CardLg link="/admin/users" title="Users" description={lorem}>
      <UsersIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </CardLg>
  );
};

// -------------------------------
// INSTANCE CARD
const instanceDesc =
  "<ul className='list-disc'><li>Add Instanace</li><li>Update Instanace</li><li>Delete Instanace</li></ul>";
export const InstanceCardLg = () => {
  return (
    <CardLg link="/admin/instance" title="Instance" description={lorem}>
      <InstanceIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </CardLg>
  );
};
// -------------------------------
// UNIVERSITY CARD
export const InstitutionCardLg = () => {
  return (
    <CardLg link="/admin/institution" title="Institution" description={lorem}>
      <UniversityIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </CardLg>
  );
};

const lorem =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta excepturi quidem quisquam fugiat! Animi praesentium ut neque expedita explicabo nobis hic quisquam velit. Cupiditate, quasi ullam minus numquam doloribus porro?";

// -------------------------------
// PRE-PROCESSOR CARD
export const PreProcessorCardLg = () => {
  return (
    <CardLg link="/i20/pre-processor" title="Pre-processor" description={lorem}>
      <PreProcessingIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </CardLg>
  );
};

// -------------------------------
// POST-PROCESSOR CARD
export const PostProcessingCardLg = () => {
  return (
    <CardLg
      link="/i20/post-processor"
      title="Post-processor"
      description={lorem}
    >
      <PostProcessingIcon className="w-16 h-16 text-indigo-900 mx-auto" />
    </CardLg>
  );
};
