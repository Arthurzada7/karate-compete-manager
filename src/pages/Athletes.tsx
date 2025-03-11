import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Plus, Search, Filter, Download, MoreHorizontal, Edit, Trash2, UserPlus 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Define types for our data
interface Athlete {
  id: string;
  name: string;
  age: number;
  gender: string;
  belt: string;
  weight: number;
  dojo: string;
  country: string;
  categories: string[];
}

// Mock data for athletes
const defaultAthletes: Athlete[] = [
  {
    id: "1",
    name: "John Doe",
    age: 25,
    gender: "Male",
    belt: "Black",
    weight: 75,
    dojo: "Dragon Dojo",
    country: "USA",
    categories: ["Kumite -75kg", "Kata Individual"]
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 23,
    gender: "Female",
    belt: "Black",
    weight: 61,
    dojo: "Tiger Academy",
    country: "Canada",
    categories: ["Kumite -61kg", "Kata Individual"]
  },
  {
    id: "3",
    name: "Alex Johnson",
    age: 21,
    gender: "Male",
    belt: "Brown",
    weight: 84,
    dojo: "Mountain Karate",
    country: "UK",
    categories: ["Kumite -84kg"]
  },
  {
    id: "4",
    name: "Maria Garcia",
    age: 19,
    gender: "Female",
    belt: "Black",
    weight: 55,
    dojo: "Phoenix Martial Arts",
    country: "Spain",
    categories: ["Kumite -55kg", "Kata Individual"]
  },
  {
    id: "5",
    name: "David Lee",
    age: 24,
    gender: "Male",
    belt: "Black",
    weight: 70,
    dojo: "Harmony Dojo",
    country: "South Korea",
    categories: ["Kumite -70kg", "Kata Individual", "Team Kata"]
  }
];

// Belt color options
const beltOptions = [
  "White", "Yellow", "Orange", "Green", "Blue", "Purple", "Brown", "Black"
];

// Countries for dropdown
const countries = [
  "USA", "Canada", "UK", "Spain", "Japan", "South Korea", "France", 
  "Germany", "Italy", "Brazil", "Australia", "China", "Russia"
];

// Category options
const categoryOptions = [
  "Kumite -55kg", "Kumite -61kg", "Kumite -68kg", "Kumite -75kg", 
  "Kumite -84kg", "Kumite +84kg", "Kata Individual", "Team Kata"
];

const Athletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>(defaultAthletes);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filterBelt, setFilterBelt] = useState("");
  const { toast } = useToast();

  // New athlete form state
  const [newAthlete, setNewAthlete] = useState<Omit<Athlete, "id" | "categories"> & { categories: string[] }>({
    name: "",
    age: 0,
    gender: "",
    belt: "",
    weight: 0,
    dojo: "",
    country: "",
    categories: []
  });

  // Filter athletes based on search and filter criteria
  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          athlete.dojo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          athlete.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBelt = filterBelt === "" || athlete.belt === filterBelt;
    
    return matchesSearch && matchesBelt;
  });

  // Handle input change for new athlete form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Convert numeric fields
    if (name === "age" || name === "weight") {
      setNewAthlete({ ...newAthlete, [name]: parseInt(value) || 0 });
    } else {
      setNewAthlete({ ...newAthlete, [name]: value });
    }
  };

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setNewAthlete({ ...newAthlete, [name]: value });
  };

  // Add a category to new athlete
  const handleAddCategory = (category: string) => {
    if (!newAthlete.categories.includes(category)) {
      setNewAthlete({
        ...newAthlete,
        categories: [...newAthlete.categories, category]
      });
    }
  };

  // Remove a category from new athlete
  const handleRemoveCategory = (category: string) => {
    setNewAthlete({
      ...newAthlete,
      categories: newAthlete.categories.filter(c => c !== category)
    });
  };

  // Submit new athlete form
  const handleAddAthlete = () => {
    // Validation
    if (!newAthlete.name || !newAthlete.gender || !newAthlete.belt || !newAthlete.dojo || !newAthlete.country) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    if (newAthlete.age <= 0) {
      toast({
        title: "Invalid Age",
        description: "Please enter a valid age",
        variant: "destructive"
      });
      return;
    }

    if (newAthlete.weight <= 0) {
      toast({
        title: "Invalid Weight",
        description: "Please enter a valid weight",
        variant: "destructive"
      });
      return;
    }

    if (newAthlete.categories.length === 0) {
      toast({
        title: "No Categories Selected",
        description: "Please select at least one category",
        variant: "destructive"
      });
      return;
    }

    // Add athlete to list
    const newId = (athletes.length + 1).toString();
    setAthletes([
      ...athletes,
      { ...newAthlete, id: newId }
    ]);

    // Reset form and close dialog
    setNewAthlete({
      name: "",
      age: 0,
      gender: "",
      belt: "",
      weight: 0,
      dojo: "",
      country: "",
      categories: []
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Athlete Added",
      description: `${newAthlete.name} has been added successfully`
    });
  };

  // Delete an athlete
  const handleDeleteAthlete = (id: string) => {
    setAthletes(athletes.filter(athlete => athlete.id !== id));
    toast({
      title: "Athlete Removed",
      description: "The athlete has been removed successfully"
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-karate-black mb-1">Athletes</h1>
          <p className="text-karate-gray">Manage participants in your tournament</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="mt-4 md:mt-0 bg-karate-red hover:bg-karate-red/90 flex items-center gap-2"
        >
          <UserPlus size={16} />
          <span>Add Athlete</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Summary Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Total Athletes</CardTitle>
            <CardDescription>Current tournament registration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-karate-black">
                {athletes.length}
              </div>
              <div className="space-y-1">
                <div className="text-sm text-karate-gray">
                  Active Participants
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{athletes.filter(a => a.gender === "Male").length} Male</Badge>
                  <Badge variant="outline">{athletes.filter(a => a.gender === "Female").length} Female</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weight Classes</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(athletes.map(a => a.categories.filter(c => c.includes("Kumite"))).flat())).map(category => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Athletes Registry Card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Athletes Registry</CardTitle>
            <CardDescription>
              View and manage all registered athletes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search athletes, dojos, or countries..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={filterBelt} onValueChange={(value) => setFilterBelt(value)}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter size={16} />
                      <SelectValue placeholder="Filter by belt" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Belts</SelectItem>
                    {beltOptions.map(belt => (
                      <SelectItem key={belt} value={belt}>{belt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Belt</TableHead>
                    <TableHead className="hidden md:table-cell">Weight</TableHead>
                    <TableHead className="hidden md:table-cell">Dojo</TableHead>
                    <TableHead className="hidden lg:table-cell">Country</TableHead>
                    <TableHead className="hidden lg:table-cell">Categories</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAthletes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-karate-gray">
                        No athletes found matching your search criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAthletes.map((athlete) => (
                      <TableRow key={athlete.id}>
                        <TableCell className="font-medium">{athlete.name}</TableCell>
                        <TableCell>{athlete.age}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${
                              athlete.belt === "Black" 
                                ? "border-black bg-black text-white" 
                                : athlete.belt === "Brown" 
                                  ? "border-amber-700 bg-amber-700 text-white"
                                  : athlete.belt === "White"
                                    ? "border-gray-200 bg-gray-200"
                                    : "border-blue-500 bg-blue-500 text-white"
                            }`}
                          >
                            {athlete.belt}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{athlete.weight} kg</TableCell>
                        <TableCell className="hidden md:table-cell">{athlete.dojo}</TableCell>
                        <TableCell className="hidden lg:table-cell">{athlete.country}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {athlete.categories.map(category => (
                              <Badge key={category} variant="secondary" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Edit size={16} />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="flex items-center gap-2 text-destructive focus:text-destructive"
                                onClick={() => handleDeleteAthlete(athlete.id)}
                              >
                                <Trash2 size={16} />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Athlete Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Athlete</DialogTitle>
            <DialogDescription>
              Enter the athlete details to register for the tournament
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter athlete's full name"
                value={newAthlete.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="Enter age"
                value={newAthlete.age || ""}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={newAthlete.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="belt">Belt</Label>
              <Select
                value={newAthlete.belt}
                onValueChange={(value) => handleSelectChange("belt", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select belt color" />
                </SelectTrigger>
                <SelectContent>
                  {beltOptions.map(belt => (
                    <SelectItem key={belt} value={belt}>{belt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.1"
                placeholder="Enter weight in kg"
                value={newAthlete.weight || ""}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dojo">Dojo / School</Label>
              <Input
                id="dojo"
                name="dojo"
                placeholder="Enter dojo name"
                value={newAthlete.dojo}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={newAthlete.country}
                onValueChange={(value) => handleSelectChange("country", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {categoryOptions.map(category => {
                  const isSelected = newAthlete.categories.includes(category);
                  return (
                    <Badge
                      key={category}
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer ${
                        isSelected 
                          ? "bg-karate-red hover:bg-karate-red/80" 
                          : "hover:bg-karate-red/10"
                      }`}
                      onClick={() => isSelected 
                        ? handleRemoveCategory(category) 
                        : handleAddCategory(category)
                      }
                    >
                      {category}
                      {isSelected && (
                        <span className="ml-1" onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCategory(category);
                        }}>
                          ×
                        </span>
                      )}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-karate-red hover:bg-karate-red/90"
              onClick={handleAddAthlete}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Athlete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Athletes;
