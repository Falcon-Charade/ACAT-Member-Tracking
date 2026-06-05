import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Member } from '@shared-types/member/member.types';
import { useMembers } from '@/features/members/MembersProvider';
import {
  emptyAddMemberValues,
  hasFormErrors,
  parseAddMemberForm,
  type MemberFormErrors,
} from '@/features/members/member-form';
import { STATUS_ROUTES } from '@/routes/status-routes';

type MemberFormValues = {
  name: string;
  recruiter: string;
  joinedAt: string;
};

interface MemberFormProps {
  title: string;
  description: string;
  submitLabel: string;
  member?: Member;
}

function toInitialValues(member: Member | undefined): MemberFormValues {
  if (!member) {
    return emptyAddMemberValues;
  }

  return {
    name: member.name,
    recruiter: member.recruiter,
    joinedAt: member.joinedAt.toISOString().slice(0, 10),
  };
}

export function MemberForm({
  title,
  description,
  submitLabel,
  member,
}: MemberFormProps) {
  const navigate = useNavigate();
  const { addMember } = useMembers();
  const [errors, setErrors] = useState<MemberFormErrors>({});
  const values = toInitialValues(member);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { draft, errors } = parseAddMemberForm(
      new FormData(event.currentTarget),
    );

    if (hasFormErrors(errors)) {
      setErrors(errors);
      return;
    }

    addMember(draft);
    navigate(STATUS_ROUTES.created);
  }

  return (
    <div className="max-w-3xl space-y-4">
      <Button variant="ghost" asChild>
        <Link to="/">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to members
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">User name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={values.name}
                placeholder="Member name"
                required
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? (
                <p className="text-sm text-destructive">{errors.name}</p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="recruiter">Recruiter</Label>
              <Input
                id="recruiter"
                name="recruiter"
                defaultValue={values.recruiter}
                placeholder="Recruiter name"
                required
                aria-invalid={Boolean(errors.recruiter)}
              />
              {errors.recruiter ? (
                <p className="text-sm text-destructive">{errors.recruiter}</p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="joinedAt">Joined date</Label>
              <Input
                id="joinedAt"
                name="joinedAt"
                type="date"
                defaultValue={values.joinedAt}
                required
                aria-invalid={Boolean(errors.joinedAt)}
              />
              {errors.joinedAt ? (
                <p className="text-sm text-destructive">{errors.joinedAt}</p>
              ) : null}
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button variant="outline" asChild>
                <Link to="/">Cancel</Link>
              </Button>
              <Button type="submit">
                <Save className="size-4" aria-hidden="true" />
                {submitLabel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
