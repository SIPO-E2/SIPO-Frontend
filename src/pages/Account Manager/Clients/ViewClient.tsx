import { useParams } from "react-router-dom";

const ViewClient = () => {
  const { id } = useParams<{ id: string }>();
  console.log("The client that we are watching has the id: " + id);
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Marketing Manager
          </h2>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Job Description
            </h3>
            <p className="text-gray-600">
              Occaecati est et illo quibusdam accusamus qui. Incidunt aut et
              molestiae ut facere aut. Est quidem iusto praesentium excepturi
              harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium
              doloribus eaque debitis.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Key Responsibilities
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>
                Working with agency for design drawing detail, quotation and
                local production.
              </li>
              <li>
                Produce window displays, signs, interior displays, floor plans
                and special promotions displays.
              </li>
              <li>
                Change displays to promote new product launches and reflect
                festive or seasonal themes.
              </li>
              {/* Add other responsibilities */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Why You'll Love Working Here
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>
                Working with agency for design drawing detail, quotation and
                local production.
              </li>
              {/* Add other reasons */}
            </ul>
          </div>
        </div>
        <div className="text-gray-600 space-y-2">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Date Posted</h4>
            <p>15 Apr 2024</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Expiration date</h4>
            <p>15 Apr 2024</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Employment type</h4>
            <p>Part-time</p>
          </div>
          {/* Add other details */}
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div>
          <h4 className="text-sm font-semibold text-gray-700">
            Gleicher, Mueller and Tromp
          </h4>
          <p className="text-sm text-gray-600">
            1147 Rohan Drive Suite 819 - Burlington, VT / 80201
          </p>
        </div>
        <p className="text-sm text-gray-600">904-966-2836</p>
      </div>
    </div>
  );
};

export default ViewClient;
