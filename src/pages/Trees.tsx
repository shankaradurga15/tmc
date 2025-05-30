import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ListFilter, Search, Ellipsis } from "lucide-react";
import {
  List,
  MapPin,
  PanelLeft,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface TreeData {
  id: string;
  name: string;
  species: string;
  image: string;
}

interface TreeListData {
  id: string;
  name: string;
  species: string;
  location: string;
  plantedOn: string;
  plantedBy: string;
  status: "Completed" | "Due" | "In Progress" | "Pending";
  nextinspectiondate: string;
}

interface OrganizationData {
  id: string;
  name: string;
  logo: string;
}

interface VolunteerData {
  id: string;
  name: string;
  photo: string;
}

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const Trees = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("map");

  const treescrollRef = useRef<HTMLDivElement>(null);
  const orgscrollRef = useRef<HTMLDivElement>(null);
  const volunteerscrollRef = useRef<HTMLDivElement>(null);

  // Separate left arrow visibility for each section
  const [treeLeftArrowVisible, setTreeLeftArrowVisible] = useState(false);
  const [orgLeftArrowVisible, setOrgLeftArrowVisible] = useState(false);
  const [volunteerLeftArrowVisible, setVolunteerLeftArrowVisible] =
    useState(false);

  const scroll = (
    direction: "left" | "right",
    ref: React.RefObject<HTMLDivElement>
  ) => {
    const container = ref.current;
    if (!container) return;
    const scrollAmount = 200;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const updateArrowVisibility = (
      ref: React.RefObject<HTMLDivElement>,
      setLeftArrowVisible: (visible: boolean) => void
    ) => {
      const container = ref.current;
      if (container) {
        setLeftArrowVisible(container.scrollLeft > 0);
      }
    };

    const createObserver = (
      ref: React.RefObject<HTMLDivElement>,
      setLeftArrowVisible: (visible: boolean) => void
    ) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateArrowVisibility(ref, setLeftArrowVisible);
          }
        });
      }, observerOptions);

      return observer;
    };

    const treesObserver = createObserver(
      treescrollRef,
      setTreeLeftArrowVisible
    );
    const orgsObserver = createObserver(orgscrollRef, setOrgLeftArrowVisible);
    const volunteersObserver = createObserver(
      volunteerscrollRef,
      setVolunteerLeftArrowVisible
    );

    if (treescrollRef.current) treesObserver.observe(treescrollRef.current);
    if (orgscrollRef.current) orgsObserver.observe(orgscrollRef.current);
    if (volunteerscrollRef.current)
      volunteersObserver.observe(volunteerscrollRef.current);

    const handleScroll = (
      ref: React.RefObject<HTMLDivElement>,
      setLeftArrowVisible: (visible: boolean) => void
    ) => {
      if (ref.current) {
        setLeftArrowVisible(ref.current.scrollLeft > 0);
      }
    };

    const treesScrollHandler = () =>
      handleScroll(treescrollRef, setTreeLeftArrowVisible);
    const orgsScrollHandler = () =>
      handleScroll(orgscrollRef, setOrgLeftArrowVisible);
    const volunteersScrollHandler = () =>
      handleScroll(volunteerscrollRef, setVolunteerLeftArrowVisible);

    if (treescrollRef.current)
      treescrollRef.current.addEventListener("scroll", treesScrollHandler);
    if (orgscrollRef.current)
      orgscrollRef.current.addEventListener("scroll", orgsScrollHandler);
    if (volunteerscrollRef.current)
      volunteerscrollRef.current.addEventListener(
        "scroll",
        volunteersScrollHandler
      );

    return () => {
      if (treescrollRef.current) {
        treesObserver.unobserve(treescrollRef.current);
        treescrollRef.current.removeEventListener("scroll", treesScrollHandler);
      }
      if (orgscrollRef.current) {
        orgsObserver.unobserve(orgscrollRef.current);
        orgscrollRef.current.removeEventListener("scroll", orgsScrollHandler);
      }
      if (volunteerscrollRef.current) {
        volunteersObserver.unobserve(volunteerscrollRef.current);
        volunteerscrollRef.current.removeEventListener(
          "scroll",
          volunteersScrollHandler
        );
      }

      treesObserver.disconnect();
      orgsObserver.disconnect();
      volunteersObserver.disconnect();
    };
  }, []);

  const trees: TreeData[] = [
    {
      id: "1",
      name: "Neem Tree",
      species: "Azadirachta Indica",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    },
    {
      id: "2",
      name: "Banyan Tree",
      species: "Ficus Benghalensis",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    },
    {
      id: "3",
      name: "Oak Tree",
      species: "Quercus Robur",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    },
    {
      id: "4",
      name: "Pine Tree",
      species: "Pinus Sylvestris",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    },
    {
      id: "5",
      name: "Bamboo Tree",
      species: "Bambusa Vulgaris",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
  ];

  const organizations: OrganizationData[] = [
    { id: "1", name: "ITC Foundation", logo: "/hclfoundation_logo.jpg" },
    { id: "2", name: "Rotary Club", logo: "/rotary club.jpg" },
    { id: "3", name: "Tuticorin Corporation", logo: "/tuti corporation.jpg" },
    { id: "4", name: "Lions Club", logo: "/lions club.webp" },
    { id: "5", name: "TN Government", logo: "/Tamilnadu.png" },
  ];

  const volunteers: VolunteerData[] = [
    { id: "1", name: "Cory Fisher", photo: "/volunteer1.jpg" },
    { id: "2", name: "Albert Flores", photo: "/volunteer2.jpg" },
    { id: "3", name: "Bessie Cooper", photo: "/volunteer3.jpg" },
    { id: "4", name: "Ralph Edwards", photo: "/volunteer4.jpg" },
    { id: "5", name: "Dianne Russell", photo: "/volunteer4.jpg" },
  ];

  // Sample data for the detailed tree list view
  const detailedTrees: TreeListData[] = [
    {
      id: "T171",
      name: "Neem",
      location: "Location 171",
      species: "Azadirachta Indica",
      plantedOn: "Dec 23, 2023",
      plantedBy: "Location 45",
      status: "Due",
      nextinspectiondate: "April 27,2025",
    },
    {
      id: "T035",
      name: "Banyan",
      species: "Ficus Benghalensis",
      location: "Location 35",
      plantedOn: "Dec 23, 2023",
      plantedBy: "Rotary Club",
      status: "Completed",
      nextinspectiondate: "April 27,2025",
    },
    {
      id: "T045",
      name: "Oak",
      species: "Quercus Robur",
      location: "Location 45",
      plantedOn: "Dec 27, 2023",
      plantedBy: "Lions Club",
      status: "Due",
      nextinspectiondate: "April 27,2025",
    },
    {
      id: "T140",
      name: "Pine",
      species: "Pinus Sylvestris",
      location: "Location 140",
      plantedOn: "Dec 25, 2023",
      plantedBy: "Tuticorin Corporation",
      status: "Completed",
      nextinspectiondate: "April 27,2025",
    },
    {
      id: "T004",
      name: "Bamboo",
      species: "Bambusa Vulgaris",
      location: "Location 4",
      plantedOn: "Dec 20, 2023",
      plantedBy: "TN Government",
      status: "Pending",
      nextinspectiondate: "May 05,2025",
    },
    {
      id: "T183",
      name: "Maple",
      species: "Acer Sacchrarum",
      location: "Location 183",
      plantedOn: "Dec 26, 2023",
      plantedBy: "TN Government",
      status: "In Progress",
      nextinspectiondate: "May 2,2025",
    },
    {
      id: "T042",
      name: "Coconut Palm",
      species: "Cocus Nucifera",
      location: "Location 42",
      plantedOn: "Dec 22, 2023",
      plantedBy: "TN Government",
      status: "Completed",
      nextinspectiondate: "April 27,2025",
    },
    {
      id: "T111",
      name: "Redwood",
      species: "Sequoia Sempervirens",
      location: "Location 111",
      plantedOn: "Dec 20, 2023",
      plantedBy: "TN Government",
      status: "Pending",
      nextinspectiondate: "May 05, 2025",
    },
    {
      id: "T027",
      name: "Cherry Blosssom",
      species: "Prunus Serrulata",
      location: "Location 27",
      plantedOn: "Dec 18, 2023",
      plantedBy: "TN Government",
      status: "Completed",
      nextinspectiondate: "May 05,2025",
    },
    {
      id: "T036",
      name: "Mango",
      species: "Mangifera Grandis",
      location: "Location 36",
      plantedOn: "Mar 3, 2024",
      plantedBy: "TN Government",
      status: "Pending",
      nextinspectiondate: "May 07,2025",
    },
  ];

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Due":
        return "bg-red-100 text-red-800";
        case "In Progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="pl-64 p-6 bg-gray-50 min-h-screen">
      {/* Top Controls and Title */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <PanelLeft className="w-4 h-4" />
              Trees
            </h1>
          </div>
          <h1 className="text-2xl font-semibold mb-1">Tree Locations</h1>
          <p className="text-gray-500 text-sm">
            View and manage tree plantations across Tuticorin district
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 -mt-6">
          <img
            src="/logo-placeholder.png"
            alt="Logo"
            className="w-9 h-9 object-contain"
          />
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-md shadow-sm border flex">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-r-none"
              >
                <List size={18} className="mr-1" /> List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="rounded-l-none"
              >
                <MapPin size={18} className="mr-1" /> Map
              </Button>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter size={18} /> Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h3 className="font-medium mb-2">Filter Options</h3>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Tree Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Neem", "Banyan", "Oak", "Pine"].map((type) => (
                        <Badge
                          key={type}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-white"
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Ward</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Ward 1", "Ward 2", "Ward 3"].map((ward) => (
                        <Badge
                          key={ward}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-white"
                        >
                          {ward}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <Button variant="outline" size="sm">
                      Reset
                    </Button>
                    <Button size="sm">Apply Filters</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <Tabs
        value={viewMode}
        onValueChange={(value) => setViewMode(value as "list" | "map")}
      >
        <TabsContent value="map">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-[500px] flex flex-col gap-6 border border-gray-200 rounded-md p-4">
              {/* Trees Carousel */}
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Latest Featured Trees
                </h2>
                <div className="relative">
                  {/* Conditionally shown left arrow */}
                  {treeLeftArrowVisible && (
                    <button
                      onClick={() => scroll("left", treescrollRef)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/40 rounded-full p-2 font-bold"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                  )}

                  <div
                    ref={treescrollRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
                  >
                    {trees.map((tree) => (
                      <Card
                        key={tree.id}
                        className="bg-[#194f33] text-white rounded-lg shadow overflow-hidden flex-shrink-0"
                        style={{ width: "140px" }}
                      >
                        <div
                          className="h-32 overflow-hidden rounded-xl border-8"
                          style={{ borderColor: "#194f33" }}
                        >
                          <img
                            src={tree.image}
                            alt={tree.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="pt-2 pb-2 px-3">
                          <h3 className="text-base font-semibold leading-tight">
                            {tree.name}
                          </h3>
                          <p className="text-xs mt-1">{tree.species}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <button
                    onClick={() => scroll("right", treescrollRef)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/40 rounded-full p-2"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Organizations */}
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Featured Organisations
                </h2>
                <div className="relative">
                  {orgLeftArrowVisible && (
                    <button
                      onClick={() => scroll("left", orgscrollRef)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/40 rounded-full p-2"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                  )}

                  <div
                    ref={orgscrollRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
                  >
                    {organizations.map((org) => (
                      <Card
                        key={org.id}
                        className="bg-[#194f33] text-white rounded-lg shadow overflow-hidden flex-shrink-0"
                        style={{ width: "140px" }}
                      >
                        <div
                          className="h-32 overflow-hidden rounded-xl border-8"
                          style={{ borderColor: "#194f33" }}
                        >
                          <img
                            src={org.logo}
                            alt={org.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="pt-2 pb-2 px-3">
                          <h3 className="text-sm font-semibold leading-tight">
                            {org.name}
                          </h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <button
                    onClick={() => scroll("right", orgscrollRef)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/40 rounded-full p-2"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Volunteers */}
              <div>
                <h2 className="text-lg font-semibold mb-4">New Volunteers</h2>
                <div className="relative">
                  {volunteerLeftArrowVisible && (
                    <button
                      onClick={() => scroll("left", volunteerscrollRef)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/40 rounded-full p-2"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                  )}

                  <div
                    ref={volunteerscrollRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
                  >
                    {volunteers.map((volunteer) => (
                      <Card
                        key={volunteer.id}
                        className="bg-[#194f33] text-white rounded-lg shadow overflow-hidden flex-shrink-0"
                        style={{ width: "140px" }}
                      >
                        <div
                          className="h-32 overflow-hidden rounded-xl border-8"
                          style={{ borderColor: "#194f33" }}
                        >
                          <img
                            src={volunteer.photo}
                            alt={volunteer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="pt-2 pb-2 px-3">
                          <h3 className="text-base font-semibold leading-tight">
                            {volunteer.name}
                          </h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <button
                    onClick={() => scroll("right", volunteerscrollRef)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/40 rounded-full p-2"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Map View */}
            <div className="w-full lg:w-2/3 min-h-[600px]">
              <div className="bg-white p-4 rounded-md shadow mb-6 h-[800px]">
                <h2 className="text-lg font-semibold mb-4">Tree Map View</h2>
                <div className="h-[700px] rounded-md overflow-hidden">
                  <MapContainer
                    center={[10.765, 78.818]}
                    zoom={13}
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    <Marker position={[10.765, 78.818]} icon={markerIcon}>
                      <Popup>3 trees in this location</Popup>
                    </Marker>
                    <Marker position={[10.775, 78.83]} icon={markerIcon}>
                      <Popup>7 trees here</Popup>
                    </Marker>
                    <Marker position={[10.758, 78.822]} icon={markerIcon}>
                      <Popup>2 trees in this area</Popup>
                    </Marker>
                    <Marker position={[10.75, 78.812]} icon={markerIcon}>
                      <Popup>5 dead/diseased trees</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          {/* Detailed Tree List View - This is what shows when "List" is clicked */}
          <div className="bg-white rounded-md shadow mb-6">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Left Side: Title and count */}
                <div>
                  <h2 className="text-lg font-semibold">All Trees</h2>
                  <p className="text-sm text-gray-500">
                    Total trees: {detailedTrees.length}
                  </p>
                </div>

                {/* Right Side: Buttons */}
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 text-sm border rounded hover:bg-gray-100">
                    Species
                    <ListFilter className="w-4 h-4" />
                  </button>

                  <button className="flex items-center gap-1 px-3 py-1 text-sm border rounded hover:bg-gray-100">
                    Location
                    <ListFilter className="w-4 h-4" />
                  </button>
                  <div className="relative">
                    <Search
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4"
                      style={{ color: "#9da4b0" }}
                    />
                    <input
                      type="text"
                      placeholder="Search Trees..."
                      className="pl-8 pr-3 py-1 text-sm border rounded text-black placeholder-[#9da4b0]"
                    />
                  </div>
                  <button className="p-2 border rounded hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0014 13v6a1 1 0 01-2 0v-6a1 1 0 00-.293-.707L5.293 6.707A1 1 0 015 6V4z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[100px]">Tree ID</TableHead>
                    <TableHead>Tree Name</TableHead>
                    <TableHead>Species</TableHead>
                    <TableHead>Planted On</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Next Inspection Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Planted By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedTrees.map((tree) => (
                    <TableRow key={tree.id}>
                      <TableCell className="font-medium">{tree.id}</TableCell>
                      <TableCell>{tree.name}</TableCell>
                      <TableCell>{tree.species}</TableCell>
                      <TableCell>{tree.location}</TableCell>
                      <TableCell>{tree.plantedOn}</TableCell>
                      <TableCell>{tree.plantedBy}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                            tree.status
                          )}`}
                        >
                          {tree.status}
                        </span>
                      </TableCell>
                      <TableCell>{tree.nextinspectiondate}</TableCell>
                      <TableCell className="text-right">
                        <button
                          type="button"
                          className="p-2 hover:bg-gray-100 rounded focus:outline-none"
                        >
                          <Ellipsis className="w-4 h-4 text-gray-600" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Trees;
